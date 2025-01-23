import { PostMessageType_FromDashboard, PostMessage_FromDashboard_ScrollPosition } from '@types';

export const postMessage_scrollPosition = (scrollPosition: number) => {
  console.log('Runs postMessage_scrollPosition');
  const newPostMessage: PostMessage_FromDashboard_ScrollPosition = {
    messageType: PostMessageType_FromDashboard.SCROLL_POSITION,
    messageData: {
      scrollPosition,
    },
  };

  window.frames[0]?.postMessage(newPostMessage, '*');
};
