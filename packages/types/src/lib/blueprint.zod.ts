import { z } from 'zod';
import { dataFieldSchemaArraySchema } from './dataField.zod';

export const pageBlueprintSchema = z.object({
  name: z.string(),
  description: z.string(),
  fieldsSchema: dataFieldSchemaArraySchema,
});

// TODO: Add satisfies with blueprint typescript file
