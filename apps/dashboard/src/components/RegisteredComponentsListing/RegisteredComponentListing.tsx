import React from 'react';
import { getRegisteredComponents } from '../../utils/api/fetchers';
import { RegisteredComponentItem } from './RegisteredComponentItem';

type Props = {
  pageContentId: string;
};

export const RegisteredComponentListing = async ({ pageContentId }: Props) => {
  const registeredComponents = await getRegisteredComponents();
  console.log('registeredComponents: ', registeredComponents);
  if (!registeredComponents) return <p>No registered components</p>;

  return (
    <div className="grid grid-cols-2 gap-2">
      {registeredComponents.map((component) => (
        <RegisteredComponentItem key={component.name} component={component} pageContentId={pageContentId} />
      ))}
    </div>
  );
};
