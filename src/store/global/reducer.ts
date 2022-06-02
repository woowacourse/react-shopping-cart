import { GlobalActionType } from './action';
export interface GlobalState {
  readonly snackbar: {
    readonly isOpen: boolean;
    readonly isSuccess: boolean;
    readonly message: string;
  };
}

const initialState: GlobalState = {
  snackbar: {
    isOpen: false,
    isSuccess: false,
    message: '',
  },
};

const globalReducer = (state = initialState, action): GlobalState => {
  switch (action.type) {
    case GlobalActionType.OPEN_SNACKBAR: {
      const {
        payload: { message, isSuccess },
      } = action;

      return { ...state, snackbar: { ...state.snackbar, isOpen: true, message, isSuccess } };
    }

    case GlobalActionType.CLOSE_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          isOpen: false,
          isSuccess: false,
          message: '',
        },
      };
    }

    default:
      return state;
  }
};

export default globalReducer;
