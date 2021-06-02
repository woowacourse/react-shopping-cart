import { delay, put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { AlertActionType, alertActionType } from "../../actions/alert";
import { ALERT_MESSAGE_DURATION } from "../../constants/message";
import { isPayloadActionType } from "../../util/typeGuard";

function* watchAlert() {
  yield takeLatest(alertActionType.request, addAlertMessage);
}

function* addAlertMessage(action: AlertActionType) {
  if (!isPayloadActionType(action)) {
    return;
  }

  yield put(actions.alert.add(action.payload));
  yield delay(ALERT_MESSAGE_DURATION);
  yield put(actions.alert.remove());
}

export default watchAlert;