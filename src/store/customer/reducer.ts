import { getCookie } from '@/api/cookie';
import { CustomerActionType } from '@/store/customer/action';

export interface CustomerState {
  readonly isLoading: boolean;
  readonly isLoggedIn: boolean;
  readonly errorMessage: string;
}

const initialState: CustomerState = {
  isLoading: false,
  isLoggedIn: getCookie('access-token') ? true : false,
  errorMessage: '',
};

const customerReducer = (state = initialState, action): CustomerState => {
  switch (action.type) {
    case CustomerActionType.SIGN_UP_START:
      return {
        ...state,
        isLoading: true,
      };

    case CustomerActionType.SIGN_UP_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
      };

    case CustomerActionType.SIGN_UP_FAILED: {
      const {
        payload: { errorMessage },
      } = action;
      return {
        ...state,
        isLoading: false,
        errorMessage,
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
        errorMessage: '',
      };

    case CustomerActionType.LOGIN_FAILED: {
      const {
        payload: { errorMessage },
      } = action;

      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage,
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
        errorMessage: '',
      };

    case CustomerActionType.DELETE_USER_FAILED: {
      const {
        payload: { errorMessage },
      } = action;

      return {
        ...state,
        isLoading: false,
        errorMessage,
      };
    }

    case CustomerActionType.LOGOUT_USER: {
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: '',
      };
    }

    default:
      return state;
  }
};

export default customerReducer;
