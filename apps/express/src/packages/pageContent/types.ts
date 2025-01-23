import { PageContent } from '@types';
import { ObjectId } from 'mongodb';

export type PageContentModel = {
  '@blueprintId': ObjectId;
} & PageContent;
