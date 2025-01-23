import {
  PageContentDetails_Response,
  PostMessageType_FromDashboard,
  PostMessage_FromDashboard_PageContent,
} from '@types';

export const postMessage_pageContentData = (pageContent: PageContentDetails_Response) => {
  console.log('Runs postMessage_pageContentData');
  const newPostMessage: PostMessage_FromDashboard_PageContent = {
    messageType: PostMessageType_FromDashboard.PAGE_CONTENT,
    messageData: {
      pageContent,
    },
  };
  console.log('Runs postMessage_pageContentData', newPostMessage);

  // TODO: handle isIframeRendered
  // TODO: Add framePostMassageclient smthng like that
  window.frames[0]?.postMessage(newPostMessage, '*');
};
