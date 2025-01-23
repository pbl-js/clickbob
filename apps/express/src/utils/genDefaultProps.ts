import { DataFieldSchema } from '@types';
import { notEmpty } from './notEmpty';

// TODO: Do something with this any
export function genDefaultProps(prop: DataFieldSchema): any {
  if (prop.type === 'string') {
    if (prop.defaultValue === undefined) return undefined;

    return {
      name: prop.name,
      type: prop.type,
      value: prop.defaultValue,
    };
  }

  if (prop.type === 'number') {
    if (prop.defaultValue === undefined) return undefined;

    return {
      name: prop.name,
      type: prop.type,
      value: prop.defaultValue,
    };
  }

  if (prop.type === 'boolean') {
    if (prop.defaultValue === undefined) return undefined;

    return {
      name: prop.name,
      type: prop.type,
      value: prop.defaultValue,
    };
  }

  if (prop.type === 'object') {
    return {
      name: prop.name,
      type: prop.type,
      subfields: prop.subfields.map((i) => genDefaultProps(i)).filter(notEmpty),
    };
  }
}
