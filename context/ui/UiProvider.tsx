import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  isSidebarOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isSidebarOpen: false,
};

type Props = {
  children: React.ReactElement;
};

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toogleMenu = () => {
    dispatch({ type: 'toogleMenu' });
  };

  return (
    <UiContext.Provider value={{ ...state, toogleMenu }}>
      {children}
    </UiContext.Provider>
  );
};
