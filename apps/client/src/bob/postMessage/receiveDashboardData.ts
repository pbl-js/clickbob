import {
  PostMessageType_FromDashboard,
  PostMessage_FromDashboard,
  PostMessage_FromDashboard_PageContent,
  PostMessage_FromDashboard_ScrollPosition,
} from '@types';
import { SectionDataActionEnum } from '../context/sectionData.types';
import { useSectionData } from '../context/sectionData.context';
import React from 'react';

export function useReceiveDashboardData() {
  const { dispatch } = useSectionData();

  const receiveMessage = (event: MessageEvent<PostMessage_FromDashboard>) => {
    const { messageType } = event.data;
    // if (messageType === PostMessageType_FromDashboard.OPEN_COMUNICATION) {
    //   dispatch({
    //     type: BuilderSectionDataActionKindEnum.OPEN_COMUNICATION,
    //   });
    // }

    if (messageType === PostMessageType_FromDashboard.PAGE_CONTENT) {
      const { messageData } = event.data as unknown as PostMessage_FromDashboard_PageContent;
      console.log('CLIENT: Receive page-content', messageData.pageContent);
      dispatch({
        type: SectionDataActionEnum.SET_PAGE_CONTENT,
        payload: {
          pageContent: messageData.pageContent,
        },
      });
    }

    if (messageType === PostMessageType_FromDashboard.SCROLL_POSITION) {
      const { messageData } = event.data as unknown as PostMessage_FromDashboard_ScrollPosition;
      console.log('CLIENT: Receive scroll-position', messageData.scrollPosition);
      dispatch({
        type: SectionDataActionEnum.SET_SCROLL_POSITION,
        payload: {
          scrollPosition: messageData.scrollPosition,
        },
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage, false);
  });
}
