import { PostMessageType_ToDashboard, PostMessage_ToDashboard_DocumentHeight } from '@types';

export const postMessage_documentHeight = (documentHeight: number) => {
  const newPostMessage: PostMessage_ToDashboard_DocumentHeight = {
    messageType: PostMessageType_ToDashboard.DOCUMENT_HEIGHT,
    messageData: {
      documentHeight,
    },
  };

  return window.parent.postMessage(newPostMessage, '*');
};
