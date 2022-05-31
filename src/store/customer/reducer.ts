import { CustomerActionType } from '@/store/customer/action';

export interface CustomerState {
  readonly isLoading: boolean;
  readonly isLoggedIn: boolean;
}

const initialState: CustomerState = {
  isLoading: false,
  isLoggedIn: false,
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
      };

    case CustomerActionType.SIGN_UP_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default customerReducer;
