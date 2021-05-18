/* ACTION TYPE */
export const OPEN_CONFIRM = 'OPEN_CONFIRM';
export const CLOSE_CONFIRM = 'CLOSE_CONFIRM';

/* ACTION CREATOR */
export const confirmAction = {
  openConfirm: ({ message, approve }) => ({
    type: OPEN_CONFIRM,
    payload: { message, approve },
  }),
  closeConfirm: () => ({ type: CLOSE_CONFIRM }),
};

/* REDUCER */
export const INITIAL_STATE = {
  isOpen: false,
  message: '',
  approve: () => {},
};

export const confirmReducer = (state = INITIAL_STATE, action) => {
  const { type = '', payload = '' } = action;

  switch (type) {
    /* payload: { message, approve } */
    case OPEN_CONFIRM:
      return {
        isOpen: true,
        message: payload.message,
        approve: payload.approve,
      };

    case CLOSE_CONFIRM:
      return INITIAL_STATE;

    default:
      return state;
  }
};
