'use client';

import React, { useTransition } from 'react';
import { deletePageContent } from '../../utils/api/mutations';
import clsx from 'clsx';
import Link from 'next/link';
import { EDITOR_PAGE } from '../../utils/routes';
import { PageContentRequest } from '@types';

type Props = {
  pageContentItem: PageContentRequest;
};

export const PageContentItem = ({ pageContentItem }: Props) => {
  const [isPending, startTransition] = useTransition();

  const deleteAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    return startTransition(async () => {
      await deletePageContent(pageContentItem._id);
    });
  };

  return (
    <Link
      href={`${EDITOR_PAGE}/${pageContentItem._id}`}
      className={clsx(
        'relative z-0 bg-slate-700 rounded-md py-5 px-2 pl-5',
        'text-base break-words text-slate-300 cursor-pointer'
      )}
      key={pageContentItem._id}
    >
      {pageContentItem.name}
      <button
        className={clsx(
          'absolute z-10 top-2 bottom-2 right-2',
          'bg-slate-600 rounded-md px-4 hover:bg-slate-500',
          'text-xs'
        )}
        onClick={deleteAction}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </Link>
  );
};
