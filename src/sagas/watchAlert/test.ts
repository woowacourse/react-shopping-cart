import { expectSaga } from "redux-saga-test-plan";

import watchAlert from ".";
import actions from "../../actions";
import { ALERT_MESSAGE_DURATION } from "../../constants/message";

describe("alert saga test", () => {
  it("should getCart success", () => {
    const message = "test message";
    const timeoutBuffer = 300;

    return expectSaga(watchAlert)
      .dispatch(actions.alert.request(message))
      .put(actions.alert.add(message))
      .put(actions.alert.remove())
      .run(ALERT_MESSAGE_DURATION + timeoutBuffer);
  });
});
