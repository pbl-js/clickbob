'use client';
import { ComponentRectData, SectionRectData } from '@types';
import { createContext, useContext, useReducer } from 'react';

type RectDataAction =
  | { type: 'set-is-iframe-ready'; payload: { isReady: boolean } }
  | { type: 'add-section-data'; payload: SectionRectData }
  | { type: 'add-component-data'; payload: ComponentRectData }
  | { type: 'remove-data'; payload: ComponentRectData }
  | { type: 'set-document-height'; payload: { documentHeight: number } };
export type RectDataDispatch = (action: RectDataAction) => void;
export type RectDataState = {
  componentsRectData: ComponentRectData[];
  sectionsRectData: SectionRectData[];
  isIframeReady: boolean;
  documentHeight: number | null;
};
type RectDataProviderProps = { children: React.ReactNode };

const RectDataContext = createContext<{ state: RectDataState; dispatch: RectDataDispatch } | undefined>(undefined);

function rectDataReducer(state: RectDataState, action: RectDataAction): RectDataState {
  switch (action.type) {
    case 'set-is-iframe-ready': {
      return {
        ...state,
        isIframeReady: true,
      };
    }
    case 'set-document-height': {
      return {
        ...state,
        documentHeight: action.payload.documentHeight,
      };
    }
    // Delete existed component with same id and add new from action payload
    case 'add-component-data': {
      const existedComponents = state.componentsRectData.filter(
        ({ componentId }) => componentId !== action.payload.componentId
      );

      return {
        ...state,
        componentsRectData: [...existedComponents, action.payload],
      };
    }
    case 'add-section-data': {
      const existedSections = state.sectionsRectData.filter(({ sectionId }) => sectionId !== action.payload.sectionId);

      return {
        ...state,
        sectionsRectData: [...existedSections, action.payload],
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const RectDataProvider = ({ children }: RectDataProviderProps) => {
  const [state, dispatch] = useReducer(rectDataReducer, {
    componentsRectData: [],
    sectionsRectData: [],
    isIframeReady: false,
    documentHeight: null,
  });
  const value = { state, dispatch };

  return <RectDataContext.Provider value={value}>{children}</RectDataContext.Provider>;
};

export const useRectData = () => {
  const context = useContext(RectDataContext);
  if (context === undefined) {
    throw new Error('useRectData must be used within a RectDataProvider');
  }
  return context;
};
