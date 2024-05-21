import { RecoilRoot, useRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';

import { itemQuantityState } from '../recoil/atoms';

describe('itemQuantityState', () => {
  it('장바구니 각 아이템의 수량에 대한 itemQuantityState의 초기값은 0으로 초기화 되어 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(itemQuantityState(0)), {
      wrapper: RecoilRoot,
    });

    const [itemQuantity] = result.current;

    expect(itemQuantity).toBe(1);
  });

  it('사용자가 아이템에 대한 수량 변경 버튼을 누르면, 해당 결과가 itemQuantityState에도 반영되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(itemQuantityState(0)), {
      wrapper: RecoilRoot,
    });

    const [itemQuantity, setItemQuantity] = result.current;
    expect(itemQuantity).toBe(1);

    act(() => {
      setItemQuantity((prevQuantity) => prevQuantity + 1);
    });

    const [afterQuantity] = result.current;

    expect(afterQuantity).toBe(2);
  });
});
