'use client';

import React from 'react';
import { ComponentSchemaResponse } from '@types';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import { ActiveDragData } from '../../utils/dragLib/types';

type Props = {
  component: ComponentSchemaResponse;
  pageContentId: string;
};

export function RegisteredComponentItem({ component, pageContentId }: Props) {
  const draggebleComponentData: ActiveDragData = {
    type: 'registered-component',
    component,
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${component._id}`,
    data: draggebleComponentData,
  });

  return (
    <button
      ref={setNodeRef}
      className={clsx(
        'bg-primary w-[124px] rounded-md p-2 h-[60px]',
        'text-xs break-words text-primary-foreground',
        'cursor-move',
        {
          'ring-2 ring-slate-200': isDragging,
        }
      )}
      {...attributes}
      {...listeners}
    >
      {component.name}
    </button>
  );
}
