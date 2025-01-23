import { PostMessageType_ToDashboard, PostMessage_ToDashboard_SectionRectData } from '@types';

export const postMessage_sectionRectData = (ref: React.MutableRefObject<HTMLDivElement | null>, sectionId: string) => {
  const domData = ref.current?.getBoundingClientRect();

  if (!domData) return;

  // Get the current scroll position
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  const top = domData.top + scrollTop;
  const left = domData.left + scrollLeft;
  const bottom = domData.bottom + scrollTop;
  const right = domData.right + scrollLeft;

  const newPostMessage: PostMessage_ToDashboard_SectionRectData = {
    messageType: PostMessageType_ToDashboard.SECTION_RECT_DATA,
    messageData: {
      sectionId: sectionId,
      rectData: {
        bottom,
        top,
        left,
        right,
        height: domData.height,
        width: domData.width,
        x: left,
        y: top,
      },
    },
  };

  return window.parent.postMessage(newPostMessage, '*');
};
