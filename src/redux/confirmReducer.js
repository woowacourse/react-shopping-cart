/* ACTION TYPE */
export const OPEN_CONFIRM = 'OPEN_CONFIRM';
export const CLOSE_CONFIRM = 'CLOSE_CONFIRM';

/* ACTION CREATOR */
export const confirmAction = {
};

/* REDUCER */

export const INITIAL_STATE = {
  isOpened: false,
  message: null,
  onApprove: null,
  onCancel: null,
};

export const confirmReducer = (state = INITIAL_STATE, action) => {
};
