import { renderHook } from '@testing-library/react';

import { RecoilRoot, useRecoilState } from 'recoil';

import mockCartItems from '../mocks/cartItems';
import { cartItemsState, isCartItemSelectedState } from '../recoil/atoms';
import { act } from 'react';

describe('atoms', () => {
  it('테스트를 위해 cartItems의 초기값은 mock 데이터로 설정한다.', () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, mockCartItems)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current[0]).toEqual(mockCartItems);
  });

  it('isCartItemSelectedState의 초기값은 true이다.', () => {
    const { result } = renderHook(
      () => useRecoilState(isCartItemSelectedState(1)),
      {
        wrapper: RecoilRoot,
      },
    );
    expect(result.current).toBeTruthy();
  });

  it('isCartItemSelectedState의 boolean 값을 변경할 수 있다.', () => {
    const { result } = renderHook(
      () => useRecoilState(isCartItemSelectedState(1)),
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toBeFalsy();

    act(() => {
      result.current[1]((prevBoolean) => !prevBoolean);
    });
    expect(result.current[0]).toBeTruthy();
  });
});
