import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';
import { layoutReducer } from './reducer';
import { LayoutState } from './type';

describe('layout reducer', () => {
  describe('layout/snackbar', () => {
    const snackbarMessage = 'message';

    let layoutState: LayoutState = {
      isConfirmModalShown: false,
      isSnackbarShown: false,
      snackbarMessage: '',
      confirmModalMessage: '',
    };

    it(SHOW_SNACKBAR, () => {
      layoutState = layoutReducer(layoutState, { type: SHOW_SNACKBAR, payload: snackbarMessage });
      expect(layoutState).toEqual<LayoutState>({
        ...layoutState,
        isSnackbarShown: true,
        snackbarMessage: snackbarMessage,
      });
    });

    it(HIDE_SNACKBAR, () => {
      layoutState = layoutReducer(layoutState, { type: HIDE_SNACKBAR });
      expect(layoutState).toEqual<LayoutState>({
        ...layoutState,
        isSnackbarShown: false,
      });
    });
  });

  describe('layout/confirmModal', () => {
    const confirmModalMessage = 'message';

    let layoutState: LayoutState = {
      isConfirmModalShown: false,
      isSnackbarShown: false,
      snackbarMessage: '',
      confirmModalMessage: '',
    };

    it(SHOW_CONFIRM_MODAL, () => {
      layoutState = layoutReducer(layoutState, { type: SHOW_CONFIRM_MODAL, payload: 'message' });
      expect(layoutState).toEqual<LayoutState>({
        ...layoutState,
        isConfirmModalShown: true,
        snackbarMessage: confirmModalMessage,
      });
    });
    it(HIDE_CONFIRM_MODAL, () => {
      layoutState = layoutReducer(layoutState, { type: HIDE_CONFIRM_MODAL });
      expect(layoutState).toEqual<LayoutState>({
        ...layoutState,
        isConfirmModalShown: false,
      });
    });
  });
});
