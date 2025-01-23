'use client';
import { createContext, useContext, useReducer } from 'react';

type EditorContextAction =
  | { type: 'set-selected-bob-component-id'; payload: { selectedBobComponentId: string } }
  | { type: 'test'; payload: string };
export type EditorContextDispatch = (action: EditorContextAction) => void;
export type EditorContextState = {
  selectedBobComponentId: string | null;
};
type EditorContextProviderProps = { children: React.ReactNode };

const EditorContextContext = createContext<{ state: EditorContextState; dispatch: EditorContextDispatch } | undefined>(
  undefined
);

function editorContextReducer(state: EditorContextState, action: EditorContextAction): EditorContextState {
  switch (action.type) {
    case 'set-selected-bob-component-id': {
      return {
        ...state,
        selectedBobComponentId: action.payload.selectedBobComponentId,
      };
    }
    case 'test': {
      return state;
    }
  }
}

export const EditorContextProvider = ({ children }: EditorContextProviderProps) => {
  const [state, dispatch] = useReducer(editorContextReducer, { selectedBobComponentId: null });
  const value = { state, dispatch };
  console.log('Editor context state: ', state);
  return <EditorContextContext.Provider value={value}>{children}</EditorContextContext.Provider>;
};

export const useEditorContext = () => {
  const context = useContext(EditorContextContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within a EditorContextProvider');
  }
  return context;
};
