import { SectionDataAction, SectionDataActionEnum, SectionDataState } from './sectionData.types';

// const addComponentAction = (
//   state: SectionDataState,
//   payload: AddComponentPayload
// ): SectionDataState => {
//   return {
//     ...state,
//     draft: {
//       ...state.draft,
//       components: [...state.draft.components, payload.componentData],
//     },
//   };
// };

// const updateComponentAction = (
//   state: SectionDataState,
//   payload: UpdateComponentPayload
// ): SectionDataState => {
//   const newComponentData = payload.componentData;

//   const components = state.draft.components.map((item) => {
//     if (item.id === newComponentData.id) {
//       return newComponentData;
//     }
//     return item;
//   });

//   return {
//     ...state,
//     draft: {
//       ...state.draft,
//       components,
//     },
//   };
// };

const builderSectionDataReducer = (state: SectionDataState, action: SectionDataAction): SectionDataState => {
  const { type } = action;

  if (type === SectionDataActionEnum.OPEN_COMUNICATION) {
    return { ...state, isComunicationOpen: true };
  }

  if (type === SectionDataActionEnum.SET_SCROLL_POSITION) {
    return { ...state, scrollPosition: action.payload.scrollPosition };
  }

  if (type === SectionDataActionEnum.SET_PAGE_CONTENT) {
    return { ...state, draft: action.payload.pageContent };
  }

  // if (type === SectionDataActionEnum.ADD_COMPONENT) {
  //   return addComponentAction(state, action.payload);
  // }

  // if (type === SectionDataActionEnum.DELETE_COMPONENT) {
  //   return { ...state };
  // }

  // if (type === SectionDataActionEnum.UPDATE_COMPONENT) {
  //   return updateComponentAction(state, action.payload);
  // }

  return state;
};

export { builderSectionDataReducer };
