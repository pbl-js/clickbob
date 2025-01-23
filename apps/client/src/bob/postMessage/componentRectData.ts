import { PostMessageType_ToDashboard, PostMessage_ToDashboard_ComponentRectData } from '@types';

export const postMessage_componentRectData = ({
  ref,
  sectionId,
  componentId,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  sectionId: string;
  componentId: string;
}) => {
  const domData = ref.current?.getBoundingClientRect();

  if (!domData) return;

  const newPostMessage: PostMessage_ToDashboard_ComponentRectData = {
    messageType: PostMessageType_ToDashboard.COMPONENT_RECT_DATA,
    messageData: {
      sectionId,
      componentId,
      rectData: {
        bottom: domData.bottom,
        top: domData.top,
        left: domData.left,
        right: domData.right,
        height: domData.height,
        width: domData.width,
        x: domData.x,
        y: domData.y,
      },
    },
  };

  return window.parent.postMessage(newPostMessage, '*');
};
