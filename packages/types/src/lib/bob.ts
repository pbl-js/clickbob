import { DataFieldSchema } from './dataField';
import { Omit2 } from './helpers';
import { LoadableComponent } from 'next/dynamic';
import { ComponentContent } from './content';

export type ComponentSchema = {
  name: string;
  propsSchema: DataFieldSchema[];
};

export type ComponentSchemaResponse = {
  _id: string;
  name: string;
  propsSchema: DataFieldSchema[];
};

export type RegisteredComponent = {
  component: LoadableComponent;
} & ComponentSchema;

export type ComponentDataRequest = Omit2<Omit2<ComponentContent, '_id'>, 'componentBlueprintId'>;

export type PageContentAddComponent_Request = {
  componentBlueprintId: string;
  pageContentId: string;
  componentData: ComponentDataRequest;
};

export type PageContentDeleteComponent_request = {
  pageContentId: string;
  componentId: string;
};

export type PageContentUpdateComponents_Request = {
  pageContentId: string;
  components: Partial<ComponentDataRequest[]>;
};
