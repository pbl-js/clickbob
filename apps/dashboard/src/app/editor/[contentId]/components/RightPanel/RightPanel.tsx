'use client';
import React, { useState } from 'react';
import { useEditorContext } from '../../editorContext';
import { ComponentSchemaResponse, DataFieldContent, PageContentRequest } from '@types';
import { postMessage_pageContentData } from '../../../../../components/iframeCommunicator/postMessage/pageContentData';
import { updateComponentsFromPageContent } from '../../../../../utils/api/mutations';
import { Switch } from '@ui/components/ui/switch';
import { Label } from '@ui/components/ui/label';
import { Input } from '@ui/components/ui/input';
import { updateComponents } from './utils';
import { ObjectPropSchema } from './ObjectPropSchema';

type Props = {
  details: PageContentRequest;
  componentsSchema: ComponentSchemaResponse[];
};

export function RightPanel({ details, componentsSchema }: Props) {
  const { state } = useEditorContext();
  const [detailsState, setDetailsState] = useState(details);
  const components = detailsState.components;

  // TODO: Bad practice. State synchronization
  React.useEffect(() => {
    setDetailsState(details);
  }, [details]);
  console.log('details state: ', detailsState);
  React.useEffect(() => {
    postMessage_pageContentData(detailsState);
  }, [detailsState]);

  const editProp = ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) =>
    setDetailsState((prev) => {
      const updatedComponents = updateComponents({ componentId, newProp, components: prev.components });

      return {
        ...prev,
        components: updatedComponents,
      };
    });
  console.log('DETAILS_STATE', detailsState);
  const sendComponentsToApi = async () => {
    await updateComponentsFromPageContent({
      pageContentId: details._id,
      components: detailsState.components,
    });
  };

  const matchComponent = components.find(({ _id }) => _id === state.selectedBobComponentId);
  const matchComponentSchema = componentsSchema.find(({ _id }) => matchComponent?.componentBlueprintId === _id);

  if (!matchComponent || !matchComponentSchema) return <div>Something went wrong</div>;

  return (
    <div className="border-l h-full">
      <div className="flex flex-col gap-4 py-3">
        {matchComponentSchema.propsSchema.map((propSchema) => {
          const matchComponentMatchProp = matchComponent.props.find(
            (matchComponentProp) => matchComponentProp.name === propSchema.name
          );
          console.log('propSchema: ', propSchema);

          if (propSchema.type === 'string')
            return (
              <div className="grid w-full max-w-sm items-center gap-1.5 px-3" key={propSchema.name}>
                <Label htmlFor={propSchema.name}>{propSchema.name}</Label>
                <Input
                  id={propSchema.name}
                  value={matchComponentMatchProp?.type === 'string' ? matchComponentMatchProp.value : ''}
                  onBlur={sendComponentsToApi}
                  onChange={(e) =>
                    editProp({
                      componentId: matchComponent._id,
                      newProp: {
                        type: 'string',
                        name: propSchema.name,
                        value: e.target.value,
                      },
                    })
                  }
                  type="text"
                  placeholder={propSchema.name}
                />
              </div>
            );

          if (propSchema.type === 'number')
            return (
              <div className="grid w-full max-w-sm items-center gap-1.5 px-3" key={propSchema.name}>
                <Label htmlFor={propSchema.name}>{propSchema.name}</Label>
                <Input
                  id={propSchema.name}
                  type="number"
                  value={matchComponentMatchProp?.type === 'number' ? matchComponentMatchProp.value : 0}
                  onBlur={sendComponentsToApi}
                  onChange={(e) =>
                    editProp({
                      componentId: matchComponent._id,
                      newProp: {
                        type: 'number',
                        name: propSchema.name,
                        value: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            );
          if (propSchema.type === 'boolean')
            return (
              <div className="flex justify-between space-x-2 px-3" key={propSchema.name}>
                <Label htmlFor={propSchema.name}>{propSchema.name}</Label>
                <Switch
                  checked={matchComponentMatchProp?.type === 'boolean' ? matchComponentMatchProp.value : false}
                  onCheckedChange={async (e) => {
                    const newProp: DataFieldContent = {
                      type: 'boolean',
                      name: propSchema.name,
                      value: e,
                    };

                    editProp({
                      componentId: matchComponent._id,
                      newProp: newProp,
                    });

                    const updatedComponents = updateComponents({
                      componentId: matchComponent._id,
                      newProp,
                      components: detailsState.components,
                    });

                    // Note: We can't use detailsState.components because setState is "async"
                    await updateComponentsFromPageContent({
                      pageContentId: details._id,
                      components: updatedComponents,
                    });
                  }}
                />
              </div>
            );

          if (propSchema.type === 'object') {
            console.log('testowanko: ', matchComponentMatchProp);
            if (matchComponentMatchProp && matchComponentMatchProp.type !== 'object')
              throw new Error('ObjectPropSchema: subfield is not an object');

            return (
              <ObjectPropSchema
                key={propSchema.name}
                component={matchComponent}
                editProp={editProp}
                sendComponentsToApi={sendComponentsToApi}
                value={matchComponentMatchProp?.subfields || null}
                originObjectValue={matchComponentMatchProp}
                detailsState={detailsState}
                propSchema={propSchema}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
