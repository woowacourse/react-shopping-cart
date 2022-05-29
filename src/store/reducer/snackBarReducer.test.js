import { SNACKBAR_ACTION_TYPE } from 'store/action/snackBarActions';
import snackBarReducer from './snackBarReducer';

describe('스낵바 메세지 저장상태 테스트', () => {
  let messageState = { text: '' };
  const reducer = action => {
    messageState = snackBarReducer(messageState, action);
  };

  beforeEach(() => {
    messageState = {
      text: '',
    };
  });

  test('메세지를 전달하면 저장할 수 있다.', () => {
    const message = '안녕하세요.';

    reducer({
      type: SNACKBAR_ACTION_TYPE.NEW_MESSAGE,
      payload: {
        message,
      },
    });

    expect(messageState.text).toEqual(message);
  });

  test('메세지 초기화 요청이 들어오면 저장된 메세지를 비울 수 있다.', () => {
    const message = '안녕하세요.';

    reducer({
      type: SNACKBAR_ACTION_TYPE.NEW_MESSAGE,
      payload: {
        message,
      },
    });

    reducer({
      type: SNACKBAR_ACTION_TYPE.CLEAR_MESSAGE,
    });

    expect(messageState.text).toEqual('');
  });
});
