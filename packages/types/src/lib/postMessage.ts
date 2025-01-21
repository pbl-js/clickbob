import { ComponentSchema } from './bob';
import { BobRect } from './common';
import { PageContentDetails_Response } from './content';

// TO DASHBOARD
export enum PostMessageType_ToDashboard {
  REGISTER_COMPONENTS = 'register-components',
  IFRAME_READY = 'iframe-ready',
  SECTION_RECT_DATA = 'section-rect-data',
  COMPONENT_RECT_DATA = 'component-rect-data',
  DOCUMENT_HEIGHT = 'document-height',
}

export type PostMessage_ToDashboard_RegisterComponents = {
  messageType: PostMessageType_ToDashboard.REGISTER_COMPONENTS;
  messageData: {
    registeredComponents: ComponentSchema[];
  };
};

export type PostMessage_ToDashboard_IframeReady = {
  messageType: PostMessageType_ToDashboard.IFRAME_READY;
  messageData: {
    isReady: true;
  };
};

export type PostMessage_ToDashboard_DocumentHeight = {
  messageType: PostMessageType_ToDashboard.DOCUMENT_HEIGHT;
  messageData: {
    documentHeight: number;
  };
};

export type PostMessage_ToDashboard_SectionRectData = {
  messageType: PostMessageType_ToDashboard.SECTION_RECT_DATA;
  messageData: {
    sectionId: string;
    rectData: BobRect;
  };
};

export type PostMessage_ToDashboard_ComponentRectData = {
  messageType: PostMessageType_ToDashboard.COMPONENT_RECT_DATA;
  messageData: {
    sectionId: string;
    componentId: string;
    rectData: BobRect;
  };
};

export type PostMessage_ToDashboard =
  | PostMessage_ToDashboard_RegisterComponents
  | PostMessage_ToDashboard_DocumentHeight
  | PostMessage_ToDashboard_IframeReady
  | PostMessage_ToDashboard_SectionRectData
  | PostMessage_ToDashboard_ComponentRectData;

// FROM DASHBOARD
export enum PostMessageType_FromDashboard {
  PAGE_CONTENT = 'page-content',
  SCROLL_POSITION = 'scroll-position',
  TEST = 'test',
}

export type PostMessage_FromDashboard_PageContent = {
  messageType: PostMessageType_FromDashboard.PAGE_CONTENT;
  messageData: {
    pageContent: PageContentDetails_Response;
  };
};

export type PostMessage_FromDashboard_ScrollPosition = {
  messageType: PostMessageType_FromDashboard.SCROLL_POSITION;
  messageData: {
    scrollPosition: number;
  };
};

export type PostMessage_FromDashboard =
  | PostMessage_FromDashboard_PageContent
  | PostMessage_FromDashboard_ScrollPosition;
