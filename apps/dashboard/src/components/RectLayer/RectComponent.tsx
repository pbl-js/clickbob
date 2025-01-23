import React from 'react';
import { ComponentRectData, ComponentSchemaResponse, PageContentRequest } from '@types';
import { useEditorContext } from '../../app/editor/[contentId]/editorContext';
import clsx from 'clsx';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { addComponentToPageContent } from '../../utils/api/mutations';
import { ActiveDragData } from '../../utils/dragLib/types';

export function RectComponent({
  componentRectData,
  pageContentId,
  registeredComponent,
  pageContent,
}: {
  componentRectData: ComponentRectData;
  pageContentId: string;
  registeredComponent: ComponentSchemaResponse;
  pageContent: PageContentRequest;
}) {
  const { state: editorState, dispatch: editorDispatch } = useEditorContext();
  const isComponentSelected = editorState.selectedBobComponentId === componentRectData.componentId;
  const { height, width } = componentRectData.rectData;
  const style = {
    // top,
    //  bottom,
    // left,
    //  right,
    height,
    width,
  };

  const droppableBottom = useDroppable({
    id: `rect-component-bottom-drop-area-${componentRectData.componentId}`,
    data: {
      isRectComponentfDropArea: true,
    },
  });
  const isBottomOver = droppableBottom.over?.id === `rect-component-bottom-drop-area-${componentRectData.componentId}`;

  const droppableTop = useDroppable({
    id: `rect-component-top-drop-area-${componentRectData.componentId}`,
    data: {
      isRectComponedntDropArea: true,
    },
  });
  const isTopOver = droppableBottom.over?.id === `rect-component-top-drop-area-${componentRectData.componentId}`;

  useDndMonitor({
    onDragEnd: async (e) => {
      const matchComponent = pageContent.components.find((i) => i._id === componentRectData.componentId);
      if (!matchComponent) return;

      const activeDraggableCurrentData = e.active.data.current as ActiveDragData;
      if (activeDraggableCurrentData.type !== 'registered-component') return;
      const draggedComponent = activeDraggableCurrentData.component;

      const addComponent = (order: number) =>
        addComponentToPageContent({
          componentBlueprintId: draggedComponent._id,
          pageContentId: pageContentId,
          componentData: {
            parentId: 'root',
            name: draggedComponent.name,
            props: [],
            order: order,
          },
        });

      if (`rect-component-top-drop-area-${componentRectData.componentId}` === e.over?.id) {
        try {
          const response = await addComponent(matchComponent.order);

          editorDispatch({
            type: 'set-selected-bob-component-id',
            payload: { selectedBobComponentId: response.data.componentId },
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (`rect-component-bottom-drop-area-${componentRectData.componentId}` === e.over?.id) {
        try {
          if (activeDraggableCurrentData.type !== 'registered-component') return;

          const response = await addComponent(matchComponent.order + 1);

          editorDispatch({
            type: 'set-selected-bob-component-id',
            payload: { selectedBobComponentId: response.data.componentId },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <div
      onClick={() =>
        editorDispatch({
          type: 'set-selected-bob-component-id',
          payload: { selectedBobComponentId: componentRectData.componentId },
        })
      }
      key={componentRectData.componentId}
      className={clsx('hover:border border-blue-400 relative', {
        'border border-blue-400': isComponentSelected,
      })}
      style={style}
    >
      <span
        ref={droppableBottom.setNodeRef}
        className={clsx('absolute -bottom-[1px] left-0 right-0 h-0.5', { 'bg-green-500': isBottomOver })}
      />
      <span
        ref={droppableTop.setNodeRef}
        className={clsx('absolute -top-[1px] left-0 right-0 h-0.5', { 'bg-green-500': isTopOver })}
      />
    </div>
  );
}
