import { ERROR } from '../constants';

export const handleRejected = (state, { payload }) => {
  state.error = payload.error ?? ERROR.UNKNOWN;
};
