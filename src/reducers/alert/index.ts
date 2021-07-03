import { AlertActionType, alertActionType } from "../../actions/alert";
import { ALERT_MESSAGE_MAX_NUM } from "../../constants/message";
import { isPayloadActionType } from "../../util/typeGuard";

const initialState: string[] = [];

const alertReducer = (state = initialState, action: AlertActionType) => {
  switch (action.type) {
    case alertActionType.add:
      if (!isPayloadActionType(action)) {
        return state;
      }

      return [...state, action.payload].slice(0, ALERT_MESSAGE_MAX_NUM);
    case alertActionType.remove:
      return state.slice(1);
    default:
      return state;
  }
};

export default alertReducer;
export { initialState };
