import { signUp } from '@/api/customers';
import { Dispatch } from 'redux';

export const enum CustomerActionType {
  SIGN_UP_START = 'customer/SIGN_UP_START',
  SIGN_UP_SUCCEEDED = 'customer/SIGN_UP_SUCCEEDED',
  SIGN_UP_FAILED = 'customer/SIGN_UP_FAILED',
}

interface SignUpStart {
  type: CustomerActionType.SIGN_UP_START;
}

interface SignUpSucceeded {
  type: CustomerActionType.SIGN_UP_SUCCEEDED;
}

interface SignUpFailed {
  type: CustomerActionType.SIGN_UP_FAILED;
}

export type CustomerAction = SignUpStart | SignUpSucceeded | SignUpFailed;

export const signUpAsync = userInformation => async (dispatch: Dispatch<CustomerAction>) => {
  dispatch({ type: CustomerActionType.SIGN_UP_START });

  try {
    await signUp(userInformation);

    dispatch({ type: CustomerActionType.SIGN_UP_SUCCEEDED });
  } catch ({ message }) {
    dispatch({ type: CustomerActionType.SIGN_UP_FAILED });
  }
};
