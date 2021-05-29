import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';
import { LayoutAction, LayoutState } from './type';

const initialState: LayoutState = {
  isConfirmModalShown: false,
  isSnackbarShown: false,
  snackbarMessage: '',
};

export const layoutReducer = (state: LayoutState = initialState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        isSnackbarShown: true,
        snackbarMessage: action.payload,
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        isSnackbarShown: false,
      };
    case SHOW_CONFIRM_MODAL:
      return {
        ...state,
        isConfirmModalShown: true,
      };
    case HIDE_CONFIRM_MODAL:
      return {
        ...state,
        isConfirmModalShown: false,
      };

    default:
      return state;
  }
};
