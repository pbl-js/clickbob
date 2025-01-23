'use client';

import {
  ComponentContent,
  DataFieldContent,
  DataFieldContent_Object,
  DataFieldSchema_Object,
  PageContentRequest,
} from '@types';
import { Button } from '@ui/components/ui/button';
import { Label } from '@ui/components/ui/label';
import React from 'react';
import { objectPropSchemaWrapperStyles } from './styles';
import ObjectPropSchemaEditor from './ObjectPropSchemaEditor';

export function ObjectPropSchema({
  propSchema,
  detailsState,
  value,
  editProp,
  component,
  sendComponentsToApi,
  originObjectValue,
}: {
  propSchema: DataFieldSchema_Object;
  detailsState: PageContentRequest;
  value: DataFieldContent[] | null;
  editProp: ({
    componentId,
    newProp,
  }: {
    componentId: string;
    newProp: DataFieldContent;
  }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  originObjectValue: DataFieldContent_Object | undefined;
}) {
  const [showForm, setShowForm] = React.useState(false);

  if (!value || (value?.length === 0 && !showForm))
    return (
      <div className={objectPropSchemaWrapperStyles}>
        <Label className="mx-auto">{propSchema.name}</Label>
        <Button onClick={() => setShowForm(true)}>Add object</Button>
      </div>
    );

  return (
    <>
      <div className={objectPropSchemaWrapperStyles}>
        <Label className="mx-auto">{propSchema.name}</Label>
        <div className={'flex flex-col gap-2 w-full'}>
          {propSchema.subfields.map((subfieldSchema) => {
            const matchContentField = value.find(
              (val) => val.name === subfieldSchema.name
            );

            return (
              <ObjectPropSchemaEditor
                key={subfieldSchema.name}
                schema={subfieldSchema}
                content={matchContentField}
                parentPropSchema={propSchema}
                editProp={editProp}
                sendComponentsToApi={sendComponentsToApi}
                component={component}
                detailsState={detailsState}
                componentIdNestingHistory={[propSchema.name]}
                originObjectValue={originObjectValue}
              />
            );
          })}
          <Button onClick={() => setShowForm(false)}>Clear object</Button>
        </div>
      </div>
    </>
  );
}
