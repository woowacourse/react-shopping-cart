import { EmptyAction, PayloadAction } from "typesafe-actions";

const isDefined = <T>(argument: T | undefined): argument is T => argument !== undefined;

const isPayloadActionType = 
  <T>(action: PayloadAction<string, T> | EmptyAction<string>): action is PayloadAction<string, T> => Object.keys(action).includes('payload');

export { isDefined, isPayloadActionType };
