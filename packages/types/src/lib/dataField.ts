// Schema
export type DataFieldSchema_String = {
  type: 'string';
  name: string;
  defaultValue?: string;
};

export type DataFieldSchema_Number = {
  type: 'number';
  name: string;
  defaultValue?: number;
};

export type DataFieldSchema_Boolean = {
  type: 'boolean';
  name: string;
  defaultValue?: boolean;
};

export type DataFieldSchema_Object = {
  type: 'object';
  name: string;
  subfields: DataFieldSchema[];
  //   defaultSubfields?: DataFieldSchema[];
};

export type DataFieldSchema =
  | DataFieldSchema_String
  | DataFieldSchema_Number
  | DataFieldSchema_Boolean
  | DataFieldSchema_Object;

export type DataFieldSchemaArray = DataFieldSchema[];

// Content
export type DataFieldContent_String = {
  type: 'string';
  name: string;
  value: string;
};

export type DataFieldContent_Number = {
  type: 'number';
  name: string;
  value: number;
};

export type DataFieldContent_Boolean = {
  type: 'boolean';
  name: string;
  value: boolean;
};

export type DataFieldContent_Object = {
  type: 'object';
  name: string;
  subfields: DataFieldContent[];
};

export type DataFieldContent =
  | DataFieldContent_String
  | DataFieldContent_Number
  | DataFieldContent_Boolean
  | DataFieldContent_Object;

export type DataFieldContentArray = DataFieldContent[];
