import { getCookie } from '@/api/cookie';
import { CustomerActionType } from '@/store/customer/action';

export interface CustomerState {
  readonly isLoading: boolean;
  readonly isLoggedIn: boolean;
  readonly loggedCustomer: any;
}

const initialState: CustomerState = {
  isLoading: false,
  isLoggedIn: getCookie('access-token') ? true : false,
  loggedCustomer: null,
};

const customerReducer = (state = initialState, action): CustomerState => {
  switch (action.type) {
    case CustomerActionType.GET_CUSTOMER_START: {
      return { ...state, isLoading: true };
    }

    case CustomerActionType.GET_CUSTOMER_SUCCEEDED: {
      const {
        payload: { loggedCustomer },
      } = action;

      return { ...state, isLoading: false, loggedCustomer };
    }

    case CustomerActionType.GET_CUSTOMER_FAILED: {
      return { ...state, isLoading: false };
    }

    case CustomerActionType.SIGN_UP_START:
      return {
        ...state,
        isLoading: true,
      };

    case CustomerActionType.SIGN_UP_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
      };

    case CustomerActionType.SIGN_UP_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CustomerActionType.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };

    case CustomerActionType.LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };

    case CustomerActionType.LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loggedCustomer: null,
      };
    }

    case CustomerActionType.DELETE_USER_START:
      return {
        ...state,
        isLoading: true,
      };

    case CustomerActionType.DELETE_USER_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loggedCustomer: null,
      };

    case CustomerActionType.DELETE_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CustomerActionType.LOGOUT_USER: {
      return {
        ...state,
        isLoggedIn: false,
        loggedCustomer: null,
      };
    }

    default:
      return state;
  }
};

export default customerReducer;
