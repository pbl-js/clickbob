import { Express } from 'express';
import { client } from '../../packages/db/mongo';
import { ComponentSchema, dataFieldSchemaArraySchema } from '@types';
import { z } from 'zod';

export async function registerComponentsController(app: Express) {
  app.get('/api/register-component', async (req, res) => {
    const myDB = client.db('mongotron');
    const modelSchemaCollection = myDB.collection('component-schema');

    const result = await modelSchemaCollection.find({}).toArray();

    res.json(result);
  });

  app.post('/api/register-component', async (req, res, next) => {
    try {
      // TODO: Validate components to register
      const reqBodySchema = z.array(
        z.object({
          name: z.string().min(1),
          propsSchema: dataFieldSchemaArraySchema,
        })
      );

      const componentsFromClient = reqBodySchema.parse(req.body);

      const myDB = client.db('mongotron');
      const modelSchemaCollection = myDB.collection('component-schema');
      //TODO: Add ComponentSchemaMongoModel type
      const result = (await modelSchemaCollection
        .find({})
        .toArray()) as unknown as ComponentSchema[];

      // TODO: Logic for getUnique and getOnlyChanged can be shared between express and
      // dashboard
      const componentsToUpdate = componentsFromClient.filter(
        (componentFromClient) =>
          !result.some(
            (resultItem) => resultItem.name === componentFromClient.name
          )
      );

      if (componentsToUpdate.length === 0) {
        res.status(400).send('Error inserting component');
        return;
      }

      const insertResult = await modelSchemaCollection.insertMany(
        componentsToUpdate,
        {
          ordered: true,
        }
      );

      res.send('Component registered');
    } catch (err) {
      next(err);
    }
  });
}
