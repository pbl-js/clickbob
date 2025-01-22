// Generated by ts-to-zod
import { z } from 'zod';
import {
  DataFieldSchema_Object,
  DataFieldSchema,
  DataFieldSchemaArray,
} from './dataField';

export const dataFieldSchemaStringSchema = z.object({
  type: z.literal('string'),
  name: z.string(),
  defaultValue: z.string().optional(),
});

export const dataFieldSchemaNumberSchema = z.object({
  type: z.literal('number'),
  name: z.string(),
  defaultValue: z.number().optional(),
});

export const dataFieldSchemaBooleanSchema = z.object({
  type: z.literal('boolean'),
  name: z.string(),
  defaultValue: z.boolean().optional(),
});

export const dataFieldSchemaObjectSchema: z.ZodSchema<DataFieldSchema_Object> =
  z.lazy(() =>
    z.object({
      type: z.literal('object'),
      name: z.string(),
      subfields: z.array(dataFieldSchemaSchema),
    })
  );

export const dataFieldSchemaSchema: z.ZodSchema<DataFieldSchema> = z.lazy(() =>
  z.union([
    dataFieldSchemaStringSchema,
    dataFieldSchemaNumberSchema,
    dataFieldSchemaBooleanSchema,
    dataFieldSchemaObjectSchema,
  ])
);

export const dataFieldSchemaArraySchema: z.ZodSchema<DataFieldSchemaArray> =
  z.lazy(() => z.array(dataFieldSchemaSchema));
