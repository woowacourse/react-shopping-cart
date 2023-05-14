import { renderHook, act } from '@testing-library/react-hooks';
import { useRecoilState } from 'recoil';
import useUpdateCartList from '../src/hooks/useUpdateCartList';
import { setCartListInLocalStorage } from '../src/utils/localStorageCartList';

jest.mock('recoil', () => ({
  atom: jest.fn(),
  useRecoilState: jest.fn(),
  selector: jest.fn(),
  selectorFamily: jest.fn(),
}));

jest.mock('../src/utils/localStorageCartList', () => ({
  getCartListFromLocalStorage: jest.fn(),
  setCartListInLocalStorage: jest.fn(),
}));

describe('useUpdateCartList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('cart List 를 성공적으로 업데이트 해야한다.', () => {
    const cartList = {
      1: { quantity: 2 },
      2: { quantity: 3 },
    };
    const setCartListMock = jest.fn();
    (useRecoilState as jest.Mock).mockReturnValueOnce([cartList, setCartListMock]);

    const { result } = renderHook(() => useUpdateCartList());

    act(() => {
      result.current.updateCartList({ itemId: 1, value: 5 });
    });

    expect(setCartListInLocalStorage).toHaveBeenCalledWith({
      ...cartList,
      1: { quantity: 5 },
    });
    expect(setCartListMock).toHaveBeenCalledWith({
      ...cartList,
      1: { quantity: 5 },
    });
  });
});
