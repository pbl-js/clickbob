import {
  DataFieldContent,
  DataFieldContent_Boolean,
  DataFieldContent_Number,
  DataFieldContent_String,
  DataFieldSchema,
} from '@types';
import { Button } from '@ui/components/ui/button';
import { cn } from '@ui/utils';
import React from 'react';

export default function ObjectPropSchemaDisplay({
  schema,
  content,
}: {
  schema: DataFieldSchema;
  content: DataFieldContent | undefined;
}) {
  return (
    <>
      {(() => {
        if (schema.type === 'string') {
          const narrowedContent = content as
            | DataFieldContent_String
            | undefined;

          return <div>{narrowedContent?.value || '---'}</div>;
        }
        if (schema.type === 'number') {
          const narrowedContent = content as
            | DataFieldContent_Number
            | undefined;

          return (
            <div className="text-blue-400">
              {narrowedContent?.value || '---'}
            </div>
          );
        }
        if (schema.type === 'boolean') {
          const narrowedContent = content as
            | DataFieldContent_Boolean
            | undefined;

          return (
            <div
              className={cn({
                'text-green-400': narrowedContent?.value === true,
                'text-red-400': narrowedContent?.value === false,
                'text-foreground': narrowedContent?.value === undefined,
              })}
            >
              {narrowedContent?.value === true ? 'true' : 'false'}
            </div>
          );
        }

        if (schema.type === 'object') {
          return (
            <div className="flex flex-col gap-2 w-full border p-3 rounded-md">
              {schema.subfields.map((subfield) => (
                <ObjectPropSchemaDisplay
                  key={subfield.name}
                  schema={subfield}
                  content={content}
                />
              ))}
              <Button className="w-full">Edit object</Button>
            </div>
          );
        }
      })()}
    </>
  );
}
