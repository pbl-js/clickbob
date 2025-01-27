'use client';

import React, { useTransition } from 'react';
import { deletePageContent } from '../../utils/api/mutations';
import clsx from 'clsx';
import Link from 'next/link';
import { EDITOR_PAGE } from '../../utils/routes';
import { PageContentRequest } from '@types';
import { cn } from '@ui/utils';

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
      <div
        className={cn(
          'flex gap-2 items-center absolute z-10 top-2 bottom-2 right-2'
        )}
      >
        <div
          className={cn('text-sm p-4 rounded-md h-full', {
            'text-green-500 bg-green-500/10':
              pageContentItem.status === 'published',
            'text-yellow-500 bg-yellow-500/10':
              pageContentItem.status === 'draft',
          })}
        >
          {pageContentItem.status}
        </div>
        <button
          className={cn(
            'bg-slate-600 rounded-md px-4 hover:bg-slate-500 h-full',
            'text-xs'
          )}
          onClick={deleteAction}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Link>
  );
};
