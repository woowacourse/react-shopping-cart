import createReducer from "./createReducer";

const SNACK_BAR_SUCCESS = "snack-bar/SNACK_BAR_SUCCESS";
const SNACK_BAR_FAIL = "snack-bar/SNACK_BAR_FAIL";
const SNACK_BAR_REMOVE = "snack-bar/SNACK_BAR_REMOVE";

export const setSnackBarTypeSuccess = () => ({
  type: SNACK_BAR_SUCCESS,
  snackBarState: {
    message: "장바구니에 상품이 담겼습니다",
    isOpen: true,
    duration: 3000,
    isSuccess: true,
  },
});

export const setSnackBarTypeFail = () => ({
  type: SNACK_BAR_FAIL,
  snackBarState: {
    message: "해당 상품은 이미 장바구니에 존재합니다",
    isOpen: true,
    duration: 3000,
    isSuccess: false,
  },
});

export const setSnackBarTypeRemove = () => ({
  type: SNACK_BAR_REMOVE,
  snackBarState: {
    message: "",
    isOpen: false,
    duration: 0,
    isSuccess: false,
  },
});

const setSnackBar = (_, action) => {
  return action.snackBarState;
};

const snackBarStateReducer = createReducer(
  {},
  {
    [SNACK_BAR_SUCCESS]: setSnackBar,
    [SNACK_BAR_FAIL]: setSnackBar,
    [SNACK_BAR_REMOVE]: setSnackBar,
  }
);

export default snackBarStateReducer;
