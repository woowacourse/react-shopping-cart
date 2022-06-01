import { login, signUp } from '@/api/customers';
import { Dispatch } from 'redux';

export const enum CustomerActionType {
  SIGN_UP_START = 'customer/SIGN_UP_START',
  SIGN_UP_SUCCEEDED = 'customer/SIGN_UP_SUCCEEDED',
  SIGN_UP_FAILED = 'customer/SIGN_UP_FAILED',

  LOGIN_START = 'customer/LOGIN_START',
  LOGIN_SUCCEEDED = 'customer/LOGIN_SUCCEEDED',
  LOGIN_FAILED = 'customer/LOGIN_FAILED',
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

interface LoginStart {
  type: CustomerActionType.LOGIN_START;
}

interface LoginSucceeded {
  type: CustomerActionType.LOGIN_SUCCEEDED;
}

interface LoginFailed {
  type: CustomerActionType.LOGIN_FAILED;
}

export type CustomerAction =
  | SignUpStart
  | SignUpSucceeded
  | SignUpFailed
  | LoginStart
  | LoginSucceeded
  | LoginFailed;

export const signUpAsync =
  (userInformation, navigate) => async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.SIGN_UP_START });

    try {
      await signUp(userInformation);

      dispatch({ type: CustomerActionType.SIGN_UP_SUCCEEDED });
      navigate();
    } catch ({ message }) {
      dispatch({ type: CustomerActionType.SIGN_UP_FAILED });
    }
  };

export const loginAsync =
  (userInformation, navigate) => async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.LOGIN_START });

    try {
      const responseData = await login(userInformation);

      // 토큰 저장하는 로직 추가?!
      console.log(responseData.data.accessToken);

      dispatch({ type: CustomerActionType.LOGIN_SUCCEEDED });
      navigate();
    } catch ({ response }) {
      // error일 경우 toast UI 추가?!
      console.log(response.data.error.message);

      dispatch({ type: CustomerActionType.LOGIN_FAILED });
    }
  };
