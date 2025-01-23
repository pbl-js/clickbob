import express from 'express';
import { client as mongoClient, run } from './packages/db/mongo';
import * as path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerComponentsController } from './packages/registerComponents/controller';
import { pageBlueprintController } from './packages/pageBlueprint/controller';
import { pageContentController } from './packages/pageContent/controller';

async function main() {
  const app = express();
  app.use(cors());

  await run().catch(console.dir);
  app.use(bodyParser.json());
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to express!' });
  });

  registerComponentsController(app);
  pageBlueprintController(app);
  pageContentController(app);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main();
