import { ComponentContent, DataFieldContent } from '@types';

export function updateComponents({
  components,
  componentId,
  newProp,
}: {
  components: ComponentContent[];
  componentId: string;
  newProp: DataFieldContent;
}): ComponentContent[] {
  const restComponents = components.filter((item) => item._id !== componentId);
  const matchComponent = components.find((item) => item._id === componentId);

  if (!matchComponent) return components;
  // TODO: This prop replacement is based on propName, there should be propID property
  // This is because 2 props can have same name if there are on different nesting level
  const restProps = matchComponent.props.filter((item) => item.name !== newProp.name);

  return [...restComponents, { ...matchComponent, props: [...restProps, newProp] }];
}
