import { PostMessage_ToDashboard, PostMessageType_ToDashboard } from '@types';
import { RectDataDispatch } from './rectDataContext';

const postMessageDebuggerEnabled = process.env.POST_MESSAGE_DEBUGGER || false;

export const receiveMessage = async (event: MessageEvent<PostMessage_ToDashboard>, dispatch: RectDataDispatch) => {
  if (event.data.messageType === PostMessageType_ToDashboard.SECTION_RECT_DATA) {
    const sectionRectData = event.data.messageData;
    if (postMessageDebuggerEnabled) {
      console.log('DASHBOARD: Receive section-rect-data', sectionRectData);
    }
    dispatch({ type: 'add-section-data', payload: sectionRectData });
  }

  if (event.data.messageType === PostMessageType_ToDashboard.DOCUMENT_HEIGHT) {
    const { documentHeight } = event.data.messageData;
    if (postMessageDebuggerEnabled) {
      console.log('DASHBOARD: Receive document-height', documentHeight);
    }
    dispatch({ type: 'set-document-height', payload: { documentHeight } });
  }

  if (event.data.messageType === PostMessageType_ToDashboard.COMPONENT_RECT_DATA) {
    const componentRectData = event.data.messageData;
    if (postMessageDebuggerEnabled) {
      console.log('DASHBOARD: Receive component-rect-data', componentRectData);
    }
    dispatch({ type: 'add-component-data', payload: componentRectData });
  }

  if (event.data.messageType === PostMessageType_ToDashboard.IFRAME_READY) {
    if (postMessageDebuggerEnabled) {
      console.log('DASHBOARD: Receive iframe-ready', event.data.messageData);
    }
    dispatch({
      type: 'set-is-iframe-ready',
      payload: { isReady: true },
    });
  }
};
