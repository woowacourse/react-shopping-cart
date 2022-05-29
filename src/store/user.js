const LOG_IN = 'user/LOG_IN';
const LOG_OUT = 'user/LOG_OUT';

const initialState = {
  isLoggedIn: false,
  userId: '',
};

export const logIn = (userId) => ({ type: LOG_IN, payload: userId });
export const logOut = () => ({ type: LOG_OUT });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { isLoggedIn: true, userId: action.payload };
    case LOG_OUT:
      return { isLoggedIn: false, userId: '' };
    default:
      return state;
  }
};

export default userReducer;
