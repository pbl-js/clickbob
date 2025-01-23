import React from 'react';
import { getPageContentList } from '../../utils/api/fetchers';
import { PageContentItem } from './PageContentItem.c';

type PageContentListingProps = {
  blueprintId: string;
};

export const PageContentListing = async ({ blueprintId }: PageContentListingProps) => {
  const pageContentList = await getPageContentList(blueprintId);

  return (
    <div className="w-full grid grid-cols-1 gap-2">
      {pageContentList?.map((pageContent) => (
        <PageContentItem key={pageContent._id} pageContentItem={pageContent} />
      ))}
    </div>
  );
};
