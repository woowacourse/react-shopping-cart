/* ACTION TYPE */
export const OPEN_CONFIRM = 'OPEN_CONFIRM';
export const CLOSE_CONFIRM = 'CLOSE_CONFIRM';

/* ACTION CREATOR */
export const confirmAction = {
  openConfirm: ({ message, onApprove, onCancel }) => ({
    type: OPEN_CONFIRM,
    payload: { message, onApprove, onCancel },
  }),
  closeConfirm: () => ({ type: CLOSE_CONFIRM }),
};

/* REDUCER */

export const INITIAL_STATE = {
  isOpened: false,
  message: null,
  onApprove: null,
  onCancel: null,
};

export const confirmReducer = (state = INITIAL_STATE, action) => {
  const { type = '', payload = '' } = action;

  switch (type) {
    /* payload: { message, onApprove, onCancel } */
    case OPEN_CONFIRM:
      return {
        isOpened: true,
        message: payload.message,
        onApprove: payload.onApprove,
        onCancel: payload.onCancel,
      };

    case CLOSE_CONFIRM:
      return INITIAL_STATE;

    default:
      return state;
  }
};
