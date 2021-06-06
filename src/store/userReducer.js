import { ACTION_TYPE } from '../constants';

const initialState = {
  name: 'sunhpark42',
};

export const setUserName = name => {
  return {
    type: ACTION_TYPE.SET_USER_NAME,
    payload: { name },
  };
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER_NAME:
      return {
        ...state,
        name: action.payload.name,
      };

    default:
      return state;
  }
};
