import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';
import { layoutReducer } from './reducer';
import { LayoutState } from './type';

describe('layout reducer', () => {
  describe('layout/snackbar', () => {
    let layoutState: LayoutState = {
      isConfirmModalShown: false,
      isSnackbarShown: false,
    };

    it(SHOW_SNACKBAR, () => {
      layoutState = layoutReducer(layoutState, { type: SHOW_SNACKBAR });
      expect(layoutState).toEqual<LayoutState>({
        isConfirmModalShown: false,
        isSnackbarShown: true,
      });
    });

    it(HIDE_SNACKBAR, () => {
      layoutState = layoutReducer(layoutState, { type: HIDE_SNACKBAR });
      expect(layoutState).toEqual<LayoutState>({
        isConfirmModalShown: false,
        isSnackbarShown: false,
      });
    });
  });

  describe('layout/confirmModal', () => {
    let layoutState: LayoutState = {
      isConfirmModalShown: false,
      isSnackbarShown: false,
    };

    it(SHOW_CONFIRM_MODAL, () => {
      layoutState = layoutReducer(layoutState, { type: SHOW_CONFIRM_MODAL });
      expect(layoutState).toEqual<LayoutState>({
        isConfirmModalShown: true,
        isSnackbarShown: false,
      });
    });
    it(HIDE_CONFIRM_MODAL, () => {
      layoutState = layoutReducer(layoutState, { type: HIDE_CONFIRM_MODAL });
      expect(layoutState).toEqual<LayoutState>({
        isConfirmModalShown: false,
        isSnackbarShown: false,
      });
    });
  });
});
