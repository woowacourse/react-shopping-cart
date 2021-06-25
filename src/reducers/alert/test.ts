import alertReducer from ".";
import actions from "../../actions";
import { ALERT_MESSAGE_MAX_NUM } from "../../constants/message";

const defaultMessages = ["message1", "message2"];

describe("alertReducer test", () => {
  it("should handle alert/add", () => {
    const message = "test message";

    expect(alertReducer(defaultMessages, actions.alert.add(message))).toEqual(
      [...defaultMessages, message].slice(0, ALERT_MESSAGE_MAX_NUM)
    );
  });

  it("should handle alert/remove", () => {
    expect(alertReducer(defaultMessages, actions.alert.remove())).toEqual(defaultMessages.slice(1));
  });
});
