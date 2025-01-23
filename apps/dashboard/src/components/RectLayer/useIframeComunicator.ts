import React from 'react';
import { receiveMessage } from './receivePostMessage';
import { useRectData } from './rectDataContext';
import { postMessage_pageContentData } from '../iframeCommunicator/postMessage/pageContentData';
import { PageContentRequest } from '@types';
import { postMessage_scrollPosition } from '../iframeCommunicator/postMessage/scrollPosition';

export const useIframeCommunicator = (
  pageContent: PageContentRequest,
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const { dispatch, state } = useRectData();
  const isReady = state.isIframeReady;

  React.useEffect(() => {
    if (!isReady) return;

    postMessage_pageContentData(pageContent);
  }, [pageContent, isReady]);

  React.useEffect(() => {
    const ref = wrapperRef.current;
    if (ref === null) return;

    const handleWheel = (event: Event) => {
      console.log('event: ', event);
      console.log('i scrolled', ref.scrollTop);
      postMessage_scrollPosition(ref.scrollTop);
    };
    ref.addEventListener('scroll', handleWheel);

    return () => ref.removeEventListener('wheel', handleWheel);
    // TODO: Add dependency array here and fix problem with ref which doesn't trigger useEffect re-run
  });

  React.useEffect(() => {
    window.addEventListener('message', (e) => receiveMessage(e, dispatch), false);

    return () => {
      window.removeEventListener('message', (e) => receiveMessage(e, dispatch), false);
    };
  }, [dispatch]);
};
