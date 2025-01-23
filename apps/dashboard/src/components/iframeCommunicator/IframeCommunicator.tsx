import React from 'react';
import { IframeComunicator_Client } from './IframeCommunicator.client';
import { getPageContentDetails, getRegisteredComponents } from '../../utils/api/fetchers';

export const IframeComunicator = async ({ contentId }: { contentId: string }) => {
  const registeredComponents = await getRegisteredComponents();
  const pageContentDetails = await getPageContentDetails(contentId);

  if (!registeredComponents) return;
  if (!pageContentDetails) return;

  return (
    <IframeComunicator_Client
      registeredComponents={registeredComponents}
      pageContent={pageContentDetails}
    />
  );
};
