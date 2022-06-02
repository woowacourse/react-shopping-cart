import { deleteCookie, setCookie } from '@/api/cookie';
import { deleteUser, getCustomer, login, signUp } from '@/api/customers';
import { Dispatch } from 'redux';

export const enum CustomerActionType {
  GET_CUSTOMER_START = 'customer/GET_CUSTOMER_START',
  GET_CUSTOMER_SUCCEEDED = 'customer/GET_CUSTOMER_SUCCEEDED',
  GET_CUSTOMER_FAILED = 'customer/GET_CUSTOMER_FAILED',

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

interface GetCustomerStart {
  type: CustomerActionType.GET_CUSTOMER_START;
}
interface GetCustomerSucceeded {
  type: CustomerActionType.GET_CUSTOMER_SUCCEEDED;
  payload: {
    loggedCustomer: any;
  };
}
interface GetCustomerFailed {
  type: CustomerActionType.GET_CUSTOMER_FAILED;
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

interface DeleteUserStart {
  type: CustomerActionType.DELETE_USER_START;
}

interface DeleteUserSucceeded {
  type: CustomerActionType.DELETE_USER_SUCCEEDED;
}

interface DeleteUserFailed {
  type: CustomerActionType.DELETE_USER_FAILED;
}

interface LogoutUser {
  type: CustomerActionType.LOGOUT_USER;
}
export type CustomerAction =
  | GetCustomerStart
  | GetCustomerSucceeded
  | GetCustomerFailed
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
  ({ userInformation, navigate, triggerFailedSnackbar, triggerSucceededSnackbar }) =>
  async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.SIGN_UP_START });

    try {
      await signUp(userInformation);

      dispatch({ type: CustomerActionType.SIGN_UP_SUCCEEDED });

      navigate();

      triggerSucceededSnackbar('회원가입에 성공하셨습니다. 로그인 후 서비스를 이용해주세요.');
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.SIGN_UP_FAILED,
      });

      triggerFailedSnackbar(error?.messages[0]);
    }
  };

export const loginAsync =
  ({ userInformation, navigate, triggerFailedSnackbar, triggerSucceededSnackbar }) =>
  async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.LOGIN_START });

    try {
      const responseData = await login(userInformation);

      dispatch({ type: CustomerActionType.LOGIN_SUCCEEDED });

      setCookie('access-token', responseData.data.accessToken, 3600);

      navigate();

      triggerSucceededSnackbar('로그인에 성공하셨습니다.');
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.LOGIN_FAILED,
      });

      triggerFailedSnackbar(error?.messages[0]);
    }
  };

export const leaveUserAsync =
  ({ navigate, triggerFailedSnackbar, triggerSucceededSnackbar }) =>
  async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.DELETE_USER_START });

    try {
      await deleteUser();

      dispatch({ type: CustomerActionType.DELETE_USER_SUCCEEDED });

      deleteCookie('access-token');

      navigate();

      triggerSucceededSnackbar('회원 탈퇴에 성공하였습니다');
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.DELETE_USER_FAILED,
      });

      triggerFailedSnackbar(error?.messages[0]);
    }
  };

export const getCustomerAsync =
  ({ triggerFailedSnackbar }) =>
  async (dispatch: Dispatch<CustomerAction>) => {
    dispatch({ type: CustomerActionType.GET_CUSTOMER_START });

    try {
      const {
        data: { customer },
      } = await getCustomer();

      dispatch({
        type: CustomerActionType.GET_CUSTOMER_SUCCEEDED,
        payload: {
          loggedCustomer: customer,
        },
      });
    } catch ({
      response: {
        data: { error },
      },
    }) {
      dispatch({
        type: CustomerActionType.GET_CUSTOMER_FAILED,
      });

      triggerFailedSnackbar(error?.messages[0]);
    }
  };
