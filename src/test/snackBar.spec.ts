import cartReducer, { actionCreators as snackBarActions } from "../redux/modules/snackBar";

describe("snackBarReducer 테스트", () => {
  const initialState = {
    isShowSnackBar: false,
    message: "",
  };

  it("should handle show ", () => {
    const newMessage = "snackBar message";
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      snackBarActions.show(newMessage)
    );
    expect(actual.isShowSnackBar).toEqual(true);
    expect(actual.message).toEqual(newMessage);
  });

  it("should handle hide ", () => {
    const actual = cartReducer(JSON.parse(JSON.stringify(initialState)), snackBarActions.hide());
    expect(actual.isShowSnackBar).toEqual(false);
    expect(actual.message).toEqual("");
  });
});
