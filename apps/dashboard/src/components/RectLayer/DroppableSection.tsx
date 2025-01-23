import { clsx } from 'clsx';
import React from 'react';
import { BobRect, PageContentRequest } from '@types';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { addComponentToPageContent } from '../../utils/api/mutations';
import { ActiveDragData } from '../../utils/dragLib/types';
import { useEditorContext } from '../../app/editor/[contentId]/editorContext';

export function DroppableSection({ rectData, pageContent }: { rectData: BobRect; pageContent: PageContentRequest }) {
  const { top, bottom, left, right, height, width } = rectData;
  const style = { top, bottom, left, right, height, width };

  const { dispatch: editorDispatch } = useEditorContext();

  const droppableSection = useDroppable({
    id: `rect-section-drop-area`,
    data: {
      isRectComponedntDropArea: true,
    },
  });
  const isOver = droppableSection.over?.id === `rect-section-drop-area`;

  useDndMonitor({
    onDragEnd: async (e) => {
      if (`rect-section-drop-area` === e.over?.id) {
        const activeDraggableCurrentData = e.active.data.current as ActiveDragData;
        if (activeDraggableCurrentData.type !== 'registered-component') return;
        const component = activeDraggableCurrentData.component;
        console.log('Component: ', component);
        const addComponent = () =>
          addComponentToPageContent({
            componentBlueprintId: component._id,
            pageContentId: pageContent._id,
            componentData: {
              parentId: 'root',
              name: component.name,
              props: [],
              order: 1,
            },
          });

        await addComponent();
        editorDispatch({
          type: 'set-selected-bob-component-id',
          payload: { selectedBobComponentId: component._id },
        });
        return;
      }
    },
  });

  return (
    <div
      ref={droppableSection.setNodeRef}
      style={style}
      className={clsx('absolute border border-blue-500 bg-blue-400/20 flex items-center justify-center text-blue-500', {
        'border-2 text-lg': isOver,
      })}
    >
      Put content here
    </div>
  );
}
