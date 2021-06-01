import { ActionType, createAction } from "typesafe-actions";

const alertActionType = {
  request: "alert/request",
  add: "alert/add",
  remove: "alert/remove",
};

const alert = {
  request: createAction(alertActionType.request, (message: string) => message)<string>(),
  add: createAction(alertActionType.add, (message: string) => message)<string>(),
  remove: createAction(alertActionType.remove)(),
}

type AlertActionType = ActionType<typeof alert>;

export default alert;
export { alertActionType };
export { AlertActionType };
