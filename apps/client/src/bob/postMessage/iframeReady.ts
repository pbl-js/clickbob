import { PostMessageType_ToDashboard, PostMessage_ToDashboard_IframeReady } from '@types';

export const postMessage_iframeReady = () => {
  const newPostMessage: PostMessage_ToDashboard_IframeReady = {
    messageType: PostMessageType_ToDashboard.IFRAME_READY,
    messageData: {
      isReady: true,
    },
  };

  return window.parent.postMessage(newPostMessage, '*');
};
