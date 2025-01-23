import { Express } from 'express';
import { client } from '../../packages/db/mongo';
import {
  PageBlueprint,
  PageBlueprint_MongoModel,
  pageBlueprintSchema,
} from '@types';
import { PAGE_BLUEPRINT_COLLECTION } from '../db/collections';

export async function pageBlueprintController(app: Express) {
  app.get('/api/page-blueprint', async (req, res) => {
    const getData = async () => {
      const myDB = client.db('mongotron');
      const pageBlueprintCollection = myDB.collection(
        PAGE_BLUEPRINT_COLLECTION
      );

      const result = (await pageBlueprintCollection
        .find({})
        .toArray()) as unknown as PageBlueprint_MongoModel;

      return result;
    };

    try {
      const data = await getData();
      await res.json(data);
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/page-blueprint', async (req, res, next) => {
    try {
      const reqBodySchema = pageBlueprintSchema;

      const blueprintFromClient = reqBodySchema.parse(req.body);

      const myDB = client.db('mongotron');
      const pageBlueprintCollection = myDB.collection<PageBlueprint>(
        PAGE_BLUEPRINT_COLLECTION
      );

      //TODO: Add ComponentSchemaMongoModel type
      const existedBlueprints = await pageBlueprintCollection
        .find({})
        .toArray();

      const blueprintAlreadyExsists: boolean = existedBlueprints.some(
        (existedBlueprint) => existedBlueprint.name === blueprintFromClient.name
      );

      if (blueprintAlreadyExsists) {
        res.status(400).send('Component already exist');
        return;
      }

      const insertResult = await pageBlueprintCollection.insertOne(
        blueprintFromClient
      );

      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  });
}
