import { createContext } from 'react';

type UiContextProps = {
  isSidebarOpen: boolean;
  toogleMenu: () => void;
};

export const UiContext = createContext({} as UiContextProps);
