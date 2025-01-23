import { BOB } from '../bobInstance';
import {
  PostMessage_ToDashboard_RegisterComponents,
  PostMessageType_ToDashboard,
  ComponentSchema,
} from '@types';

export function postMessage_registerComponents() {
  const registeredComponents = BOB._customComponents;

  const convertedRegisteredComponents: ComponentSchema[] = registeredComponents.map(
    ({ name, propsSchema }) => ({
      name,
      propsSchema,
    })
  );

  const newPostMessage: PostMessage_ToDashboard_RegisterComponents = {
    messageType: PostMessageType_ToDashboard.REGISTER_COMPONENTS,
    messageData: {
      registeredComponents: convertedRegisteredComponents,
    },
  };

  window.parent.postMessage(newPostMessage, '*');
}
