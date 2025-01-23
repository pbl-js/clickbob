'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React from 'react';
import { RegisteredComponentItem } from '../RegisteredComponentsListing/RegisteredComponentItem';
import { ActiveDragData } from '../../utils/dragLib/types';

export function DraggingOverlay() {
  const [dragItem, setDragItem] = React.useState<Active | null>();

  useDndMonitor({
    onDragStart: (e) => {
      setDragItem(e.active);
    },
    onDragCancel: () => {
      setDragItem(null);
    },
    onDragEnd: () => {
      setDragItem(null);
    },
  });

  if (!dragItem) return null;

  let node = <div>No drag item</div>;
  const activeDraggableCurrentData = dragItem.data.current as ActiveDragData;
  const isRegisteredComponentElement = activeDraggableCurrentData.type === 'registered-component';

  if (isRegisteredComponentElement) {
    node = <RegisteredComponentItem pageContentId="sdfsdfsdfsd" component={dragItem?.data.current?.component} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}
