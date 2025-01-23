import React from 'react';
import { ComponentContent, PageContentRequest, RegisteredComponent } from '@types';
import { BOB } from './bobInstance';
import { postMessage_componentRectData } from './postMessage/componentRectData';
import { genPropsFromContent } from './genPropsFromContent';

function SectionComponent({
  componentData,
  registeredComponent,
  sectionId,
}: {
  componentData: ComponentContent;
  registeredComponent: RegisteredComponent;
  sectionId: string;
}) {
  const ref = React.useRef<null | HTMLDivElement>(null);
  const Component = registeredComponent.component;
  const props = genPropsFromContent(componentData.props);

  React.useEffect(() => {
    const elementRef = ref.current;
    const postMessageWithClosure = () =>
      postMessage_componentRectData({ componentId: componentData._id, sectionId, ref });

    const observer = new ResizeObserver(() => {
      postMessageWithClosure();
    });

    postMessageWithClosure();
    ref.current && observer.observe(ref.current);
    window.addEventListener('scroll', postMessageWithClosure);
    window.addEventListener('resize', postMessageWithClosure);

    return () => {
      console.log('REEEEEEEEEEEEERENDER');
      elementRef && observer.unobserve(elementRef);
      window.removeEventListener('resize', postMessageWithClosure);
      window.removeEventListener('scroll', postMessageWithClosure);
    };
  }, [componentData, sectionId]);

  // TODO: Zrób tak żeby ten Component miał otypowane propsy
  return (
    <div ref={ref}>
      <Component {...props} />
      {/* <div style={{ width: '100px', height: '100px' }}>dsd</div> */}
    </div>
  );
}

export function SectionContentRenderer({ sectionData }: { sectionData: PageContentRequest }) {
  const sortedComponents = [...sectionData.components].sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });
  const bobComponents = BOB._customComponents;
  return sortedComponents.map((component) => {
    const matchBobComponent = bobComponents.find((bobComponent) => bobComponent.name === component.name);

    if (!matchBobComponent) return null;

    return (
      <SectionComponent
        key={component._id}
        sectionId={sectionData._id}
        componentData={component}
        registeredComponent={matchBobComponent}
      />
    );
  });
}
