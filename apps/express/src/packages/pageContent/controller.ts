import { Express } from 'express';
import { client } from '../db/mongo';
import {
  ComponentContentModel,
  ComponentSchemaResponse,
  PageBlueprint,
  PageContentModel,
} from '@types';
import { z } from 'zod';
import {
  COMPONENT_BLUEPRINT_COLLECTION,
  PAGE_BLUEPRINT_COLLECTION,
  PAGE_CONTENT_COLLECTION,
} from '../db/collections';
import { ObjectId, PushOperator } from 'mongodb';
import { genDefaultProps } from '../../utils/genDefaultProps';
import { ArrayElement } from '../../utils/arrayElement';
import { notEmpty } from '../../utils/notEmpty';

export async function pageContentController(app: Express) {
  app.get('/api/page-content', async (req, res) => {
    const getData = async () => {
      const querySchema = z.object({
        blueprintId: z
          .string()
          .refine((val) => ObjectId.isValid(val))
          .optional(),
      });
      const query = querySchema.parse(req.query);

      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const mongoQuery = query.blueprintId
        ? {
            '@blueprintId': new ObjectId(query.blueprintId),
          }
        : {};
      const result = await pageContentCollection.find(mongoQuery).toArray();
      return result;
    };

    try {
      const data = await getData();
      await res.json(data);
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/page-content-details', async (req, res) => {
    const getData = async () => {
      const querySchema = z.object({
        pageContentId: z
          .string()
          .refine((val) => ObjectId.isValid(val))
          .optional(),
      });
      const query = querySchema.parse(req.query);

      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const mongoQuery = query.pageContentId
        ? {
            _id: new ObjectId(query.pageContentId),
          }
        : {};
      const result = await pageContentCollection.findOne(mongoQuery);
      return result;
    };

    try {
      const data = await getData();
      await res.json(data);
    } catch (err) {
      console.log(err);
    }
  });

  app.delete('/api/page-content', async (req, res) => {
    try {
      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const querySchema = z.object({
        id: z.string().refine((val) => ObjectId.isValid(val)),
      });
      const query = querySchema.parse(req.query);

      const result = await pageContentCollection.findOneAndDelete({
        _id: new ObjectId(query.id),
      });

      await res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.post('/api/page-content', async (req, res, next) => {
    try {
      // Validate query
      const reqBodySchema = z.object({
        // TODO: Do something to coerced below type to ObjectId
        '@blueprintId': z.string().refine((val) => ObjectId.isValid(val)),
        name: z.string(),
      });

      const blueprintFromClient = reqBodySchema.parse(req.body);

      // Check if blueprint with provided ID exists
      const myDB = client.db('mongotron');

      const pageBlueprintCollection = myDB.collection(
        PAGE_BLUEPRINT_COLLECTION
      );

      const matchPageBlueprintQuery = {
        _id: new ObjectId(blueprintFromClient['@blueprintId']),
      };
      const matchPageBlueprint =
        ((await pageBlueprintCollection.findOne(
          matchPageBlueprintQuery
        )) as unknown as PageBlueprint) || null;

      if (!matchPageBlueprint) {
        res
          .status(400)
          .send('There is no page content with provided blueprintId');
        return;
      }

      // TODO: Check if page-content with provided name is already exists
      // Add page-content
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);
      console.log(blueprintFromClient);

      const insertResult = await pageContentCollection.insertOne({
        '@blueprintId': new ObjectId(blueprintFromClient['@blueprintId']),
        name: blueprintFromClient.name,
        fields: [],
        components: [],
        status: 'draft',
      });

      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/page-content/:pageContentId', async (req, res) => {
    try {
      console.log('PATCH Endpoint: /api/page-content/');
      console.log(req.params);
      const reqBodySchema = z
        .object({
          status: z.union([z.literal('draft'), z.literal('published')]),
        })
        .partial()
        .refine(
          ({ status }) => status !== undefined,
          'One of the fields must be defined'
        );

      const reqParamsSchema = z.object({
        pageContentId: z.string().min(1),
      });

      const body = reqBodySchema.parse(req.body);
      const params = reqParamsSchema.parse(req.params);

      const myDB = client.db('mongotron');

      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      // Check if pageContent exists
      const matchContent =
        await pageContentCollection.findOne<PageContentModel>({
          _id: new ObjectId(params.pageContentId),
        });

      if (!matchContent)
        return res.status(400).send('no content with provided ID');

      // Update status if it's provided
      if (body.status && matchContent.status !== body.status) {
        const updatedPageContent = await pageContentCollection.updateOne(
          { _id: new ObjectId(params.pageContentId) },
          { $set: { status: body.status } }
        );
        console.log(updatedPageContent);
        res.json(updatedPageContent);
      }

      console.log('body', body);
      console.log('params', params);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post('/api/page-content/add-component', async (req, res) => {
    const session = client.startSession();

    try {
      console.log('POST Endpoint: /api/page-content/add-component');

      // Validate body
      const reqBodySchema = z.object({
        componentBlueprintId: z.string().min(1),
        pageContentId: z.string().min(1),
        componentData: z.object({
          parentId: z.string().min(1),
          order: z.number(),
          name: z.string().min(1),
        }),
      });

      const body = reqBodySchema.parse(req.body);
      console.log('body', body);
      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);
      const componentBlueprintCollection = myDB.collection(
        COMPONENT_BLUEPRINT_COLLECTION
      );
      // Check if pageContent exists
      const matchContent =
        await pageContentCollection.findOne<PageContentModel>({
          _id: new ObjectId(body.pageContentId),
        });
      const matchBlueprint =
        await componentBlueprintCollection.findOne<ComponentSchemaResponse>({
          _id: new ObjectId(body.componentBlueprintId),
        });

      if (!matchContent)
        return res.status(400).send('no content with provided ID');
      if (!matchBlueprint)
        return res.status(400).send('no blueprint with provided ID');
      // Check if componentBlueprint exists

      // If parentID === root, check if there is
      // Check if parent component exists

      // Add component
      const componentDefaultProps = matchBlueprint.propsSchema
        .map((propSchema) => genDefaultProps(propSchema))
        .filter(notEmpty);
      console.log('Generated new props: ', componentDefaultProps);

      const componentToInsert: ComponentContentModel = {
        _id: new ObjectId(),
        componentBlueprintId: new ObjectId(
          body.componentBlueprintId
        ).toString(),
        name: body.componentData.name,
        parentId: body.componentData.parentId,
        order: body.componentData.order,
        props: componentDefaultProps,
      };

      const genComponentOrder = (component: ComponentContentModel) => {
        if (component.order >= body.componentData.order)
          return component.order + 1;

        return component.order;
      };

      await session.withTransaction(async () => {
        for await (const component of matchContent.components) {
          await pageContentCollection.updateOne(
            { _id: new ObjectId(body.pageContentId) },
            { $set: { 'components.$[t].order': genComponentOrder(component) } },
            {
              arrayFilters: [{ 't._id': new ObjectId(component._id) }],
              session,
            }
          );
        }
        const pushedObject: PushOperator<ComponentContentModel> = {
          $push: { components: componentToInsert },
        };

        await pageContentCollection.updateOne(
          { _id: new ObjectId(body.pageContentId) },
          pushedObject,
          { session }
        );
      });

      res.json({ componentId: componentToInsert._id });
    } catch (err) {
      console.log(
        'POST Endpoint: /api/page-content/add-component ERROR: ',
        err
      );
      res.status(400).json(err);
    } finally {
      await session.endSession();
    }
  });

  app.post('/api/page-content/delete-component', async (req, res) => {
    const session = client.startSession();

    try {
      console.log('POST Endpoint: /api/page-content/delete-component');
      // Validate body
      const reqBodySchema = z.object({
        pageContentId: z.string().min(1),
        componentId: z.string().min(1),
      });

      const body = reqBodySchema.parse(req.body);

      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection<PageContentModel>(
        PAGE_CONTENT_COLLECTION
      );

      // Check if pageContent and component exist
      const matchContent = await pageContentCollection.findOne({
        _id: new ObjectId(body.pageContentId),
      });

      if (!matchContent)
        return res.status(400).send('no content with provided ID');
      const matchComponent = matchContent?.components.find(
        (item) => item._id.toString() === body.componentId
      );

      if (!matchComponent)
        return res.status(400).send('no component with provided ID');

      // Database mutations
      await session.withTransaction(async () => {
        const componentsWithHigherOrderThanDeletedComponent =
          matchContent.components.filter((i) => i.order > matchComponent.order);

        // Change order of components with higher order than deleted component
        for await (const component of componentsWithHigherOrderThanDeletedComponent) {
          await pageContentCollection.updateOne(
            { _id: new ObjectId(body.pageContentId) },
            { $set: { [`components.$[t].order`]: component.order - 1 } },
            {
              arrayFilters: [{ 't._id': new ObjectId(component._id) }],
              session,
            }
          );
        }

        // Delete component
        await pageContentCollection.updateOne(
          { _id: new ObjectId(body.pageContentId) },
          { $pull: { components: { _id: new ObjectId(body.componentId) } } },
          { session }
        );
      });

      console.log(
        'POST Endpoint: /api/page-content/delete-component returned data: '
      );
      await res.send('Deleting completed');
    } catch (err) {
      console.log(
        'POST Endpoint: /api/page-content/delete-component ERROR: ',
        err
      );
      res.status(400).json(err);
    } finally {
      session.endSession();
    }
  });

  app.post('/api/page-content/update-components', async (req, res) => {
    const session = client.startSession();

    try {
      console.log('POST Endpoint: /api/page-content/update-components');
      // Validate body
      const reqBodySchema = z.object({
        pageContentId: z.string().min(1),
        components: z
          .array(
            z.object({
              _id: z.string().min(1),
              parentId: z.string().min(1),
              name: z.string().min(1),
              props: z.any(), // TODO: Add validation for props object
            })
          )
          .min(1),
      });

      const body = reqBodySchema.parse(req.body);
      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection<PageContentModel>(
        PAGE_CONTENT_COLLECTION
      );
      console.dir(body, { depth: 10 });
      console.log(
        'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
      );
      // Check if pageContent and component exist
      const matchContent = await pageContentCollection.findOne({
        _id: new ObjectId(body.pageContentId),
      });

      if (!matchContent) {
        res.status(400).send('no content with provided ID');
        console.log(
          'POST Endpoint: /api/page-content/update-components - STATUS: 400 - no content with provided ID'
        );
        return;
      }
      // const matchComponents = matchContent?.components.filter((item) => item._id.toString() === body.components.);
      console.dir(body, { depth: 10 });
      const matchComponents = matchContent.components.filter((item) =>
        body.components.some((i) => i._id === item._id.toString())
      );

      const databaseContainsRequestedComponents =
        matchComponents.length === body.components.length;
      if (!databaseContainsRequestedComponents)
        return res
          .status(400)
          .send("Database doesn't contain requested components");

      // Logic

      const generateSetObject = (
        data: ArrayElement<typeof body.components>
      ) => {
        return Object.keys(data).reduce((acc, propKey) => {
          const key = propKey as keyof typeof data;

          if (key === '_id') return acc;
          if (key === 'name') return acc;

          return { ...acc, [`components.$[t].${propKey}`]: data[key] };
        }, {});
      };

      await session.withTransaction(async () => {
        for (let i = 0; i < body.components.length; i++) {
          const component = body.components[i];

          if (!component) return;
          console.log('generateSetObject: ', generateSetObject(component));

          await pageContentCollection.updateOne(
            { _id: new ObjectId(body.pageContentId) },
            { $set: generateSetObject(component) },
            {
              arrayFilters: [
                { 't._id': new ObjectId(body.components[i]?._id) },
              ],
              session,
            }
          );
        }
      });

      // console.log('POST Endpoint: /api/page-content/update-component returned data: ', result);
      await res.send('Update completed');
    } catch (err) {
      console.log(
        'POST Endpoint: /api/page-content/update-component ERROR: ',
        err
      );
      res.status(400).json(err);
    } finally {
      await session.endSession();
    }
  });
}
