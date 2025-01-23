import { ComponentSchema, PostMessage_ToDashboard, PostMessageType_ToDashboard } from '@types';
import { postRegisteredComponents } from '../../utils/api/mutations';

export const receiveMessage = async (
  event: MessageEvent<PostMessage_ToDashboard>,
  existedComponents: ComponentSchema[] | undefined
) => {
  if (event.data.messageType === PostMessageType_ToDashboard.REGISTER_COMPONENTS) {
    if (!existedComponents) return;

    const incomingComponents = event.data.messageData.registeredComponents;

    const unregisteredComponents = incomingComponents.filter(
      (incomingComponent) =>
        !existedComponents.find(
          (existedComponent) => existedComponent.name === incomingComponent.name
        )
    );

    if (unregisteredComponents.length === 0) return;

    try {
      await postRegisteredComponents(unregisteredComponents);
    } catch (err) {
      console.log(err);
    }
  }
};
