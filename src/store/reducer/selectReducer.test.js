import { SELECT_ACTION_TYPE } from 'store/action/selectActions';
import selectReducer from './selectReducer';

describe('상품 리스트 페이지에서 선택된 상품 저장상태 테스트', () => {
  let selectedProductId = null;
  const reducer = action => {
    selectedProductId = selectReducer(selectedProductId, action);
  };

  test('상품 아이디를 전달하면 저장할 수 있다.', () => {
    const id = 1;

    reducer({
      type: SELECT_ACTION_TYPE.SELECT_PRODUCT,
      payload: {
        id,
      },
    });

    expect(selectedProductId).toEqual(id);
  });
});
