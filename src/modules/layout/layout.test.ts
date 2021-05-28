import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';
import { layoutReducer } from './reducer';
import { LayoutState } from './type';

describe('layout reducer', () => {
  it('layout/confirmModal', () => {
    const showModalState = layoutReducer(undefined, { type: SHOW_CONFIRM_MODAL });
    expect(showModalState).toEqual<LayoutState>({ isConfirmModalShown: true, isSnackbarShown: false });
    const hideModalState = layoutReducer(showModalState, { type: HIDE_CONFIRM_MODAL });
    expect(hideModalState).toEqual<LayoutState>({ isConfirmModalShown: false, isSnackbarShown: false });
  });
  it('layout/snackbar', () => {
    const showSnackbarState = layoutReducer(undefined, { type: SHOW_SNACKBAR });
    expect(showSnackbarState).toEqual<LayoutState>({ isConfirmModalShown: false, isSnackbarShown: true });
    const hideSnackbarState = layoutReducer(showSnackbarState, { type: HIDE_SNACKBAR });
    expect(hideSnackbarState).toEqual<LayoutState>({ isConfirmModalShown: false, isSnackbarShown: false });
  });
});
