import { setErrorMessage } from '../Message/actions';

const errorMiddleware = (store) => (next) => (action) => {
  if (action.errorMessage) {
    return next(setErrorMessage(action.errorMessage));
  }

  return next(action);
};

export default errorMiddleware;
