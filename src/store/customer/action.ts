import { deleteCookie, setCookie } from '@/api/cookie';
import { deleteUser, login, signUp } from '@/api/customers';
import { Dispatch } from 'redux';

export const enum CustomerActionType {
  SIGN_UP_START = 'customer/SIGN_UP_START',
  SIGN_UP_SUCCEEDED = 'customer/SIGN_UP_SUCCEEDED',
  SIGN_UP_FAILED = 'customer/SIGN_UP_FAILED',

  LOGIN_START = 'customer/LOGIN_START',
  LOGIN_SUCCEEDED = 'customer/LOGIN_SUCCEEDED',
  LOGIN_FAILED = 'customer/LOGIN_FAILED',

  DELETE_USER_START = 'customer/DELETE_USER_START',
  DELETE_USER_SUCCEEDED = 'customer/DELETE_USER_SUCCEEDED',
  DELETE_USER_FAILED = 'customer/DELETE_USER_FAILED',

  LOGOUT_USER = 'customer/LOGOUT_USER',
}

interface SignUpStart {
  type: CustomerActionType.SIGN_UP_START;
}

interface SignUpSucceeded {
  type: CustomerActionType.SIGN_UP_SUCCEEDED;
}

interface SignUpFailed {
  type: CustomerActionType.SIGN_UP_FAILED;
  payload: {
    errorMessage: string;
  };
}

interface LoginStart {
  type: CustomerActionType.LOGIN_START;
}

interface LoginSucceeded {
  type: CustomerActionType.LOGIN_SUCCEEDED;
}

interface LoginFailed {
  type: CustomerActionType.LOGIN_FAILED;
  payload: {
    errorMessage: string;
  };
}

interface DeleteUserStart {
  type: CustomerActionType.DELETE_USER_START;
}

interface DeleteUserSucceeded {
  type: CustomerActionType.DELETE_USER_SUCCEEDED;
}

interface DeleteUserFailed {
  type: CustomerActionType.DELETE_USER_FAILED;
  payload: {
    errorMessage: string;
  };
}

interface LogoutUser {
  type: CustomerActionType.LOGOUT_USER;
}
export type CustomerAction =
  | SignUpStart
  | SignUpSucceeded
  | SignUpFailed
  | LoginStart
  | LoginSucceeded
  | LoginFailed
  | DeleteUserStart
  | DeleteUserSucceeded
  | DeleteUserFailed
  | LogoutUser;

export const signUpAsync =
  (userInformation, navigate) => async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.SIGN_UP_START });

    try {
      await signUp(userInformation);

      dispatch({ type: CustomerActionType.SIGN_UP_SUCCEEDED });

      navigate();
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.SIGN_UP_FAILED,
        payload: { errorMessage: error?.messages[0] },
      });
    }
  };

export const loginAsync =
  (userInformation, navigate) => async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.LOGIN_START });

    try {
      const responseData = await login(userInformation);

      dispatch({ type: CustomerActionType.LOGIN_SUCCEEDED });

      setCookie('access-token', responseData.data.accessToken, 3600);
      navigate();
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.LOGIN_FAILED,
        payload: { errorMessage: error?.messages[0] },
      });
    }
  };

export const leaveUserAsync = navigate => async (dispatch: Dispatch<CustomerAction>) => {
  dispatch({ type: CustomerActionType.DELETE_USER_START });

  try {
    await deleteUser();

    dispatch({ type: CustomerActionType.DELETE_USER_SUCCEEDED });

    deleteCookie('access-token');
    navigate();
  } catch ({
    response: {
      data: { error },
    },
  }) {
    dispatch({
      type: CustomerActionType.DELETE_USER_FAILED,
      payload: { errorMessage: error?.messages[0] },
    });
  }
};
