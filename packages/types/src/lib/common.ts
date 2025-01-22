export type BobRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;

export type SectionRectData = {
  sectionId: string;
  rectData: BobRect;
};

export type ComponentRectData = {
  componentId: string;
  rectData: BobRect;
};
