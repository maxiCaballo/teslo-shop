import { UiState } from './';

type UIActionType = { type: 'toogleMenu' };

export const uiReducer = (state: UiState, action: UIActionType): UiState => {
  switch (action.type) {
    case 'toogleMenu':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};
