import { 스낵바_액션 } from 'actions/types';

const initialState = {
  visible: true,
  message: '스낵바 메시지입니다😊',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 스낵바_액션.PUSH_MESSAGE:
      return { visible: true, message: payload };

    case 스낵바_액션.HIDE_MESSAGE:
      return { visible: false, message: '' };
    default:
      return state;
  }
};
