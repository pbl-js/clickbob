import { ComponentSchemaResponse } from '@types';

export type ActiveDragData_RegisteredComponent = {
  type: 'registered-component';
  component: ComponentSchemaResponse;
};

export type ActiveDragData_Test = {
  type: 'test';
  test: 'test';
};

export type ActiveDragData = ActiveDragData_RegisteredComponent | ActiveDragData_Test;
