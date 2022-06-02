export const enum GlobalActionType {
  OPEN_SNACKBAR = 'global/snackbar/OPEN_SNACKBAR',
  CLOSE_SNACKBAR = 'global/snackbar/CLOSE_SNACKBAR',
}

interface OpenSnackbar {
  type: GlobalActionType.OPEN_SNACKBAR;
  payload: {
    message: string;
    isSuccess: boolean;
  };
}

interface CloseSnackbar {
  type: GlobalActionType.CLOSE_SNACKBAR;
}

export type GlobalAction = OpenSnackbar | CloseSnackbar;
