import { ObjectId } from 'mongodb';
import { DataFieldSchemaArray } from './dataField';

export type PageBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};

export type PageBlueprint_MongoModel = PageBlueprint & {
  _id: ObjectId;
};

export type PageBlueprint_GetRequest = (PageBlueprint & {
  _id: string;
})[];

export type SectionBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};

export type DataBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};
