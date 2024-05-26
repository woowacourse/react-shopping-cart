import { renderHook } from '@testing-library/react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

import mockCartItems from '../mocks/cartItems';
import {
  cartItemsState,
  isApplyingCouponModalOpenState,
  isCartItemSelectedState,
  isCountrysideSelectedState,
  isCouponApplicableState,
  isCouponSelectedState,
} from '../recoil/atoms';
import { act } from 'react';
import mockIsCartItemsSelected from '../mocks/isCartItemsSelected';

describe('atoms', () => {
  it('테스트를 위한 cartItems 값은 mock 데이터로 설정한다.', () => {
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

  describe('isCartItemSelectedState', () => {
    it('테스트를 위해 mock 데이터로 설정한다.', () => {
      const { result } = renderHook(
        () => {
          const id1IsSelected = useRecoilValue(isCartItemSelectedState(1));
          const id2IsSelected = useRecoilValue(isCartItemSelectedState(2));
          const id3IsSelected = useRecoilValue(isCartItemSelectedState(3));
          const id4IsSelected = useRecoilValue(isCartItemSelectedState(4));
          const id5IsSelected = useRecoilValue(isCartItemSelectedState(5));

          return {
            id1IsSelected,
            id2IsSelected,
            id3IsSelected,
            id4IsSelected,
            id5IsSelected,
          };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                  set(
                    isCartItemSelectedState(mockIsCartItemsSelected.id),
                    mockIsCartItemsSelected.boolean,
                  ),
                );
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current.id1IsSelected).toBeTruthy();
      expect(result.current.id2IsSelected).toBeTruthy();
      expect(result.current.id3IsSelected).toBeTruthy();
      expect(result.current.id4IsSelected).toBeFalsy();
      expect(result.current.id5IsSelected).toBeFalsy();
    });

    it('초기값은 true이다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCartItemSelectedState(1)),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current).toBeTruthy();
    });

    it('boolean 값을 변경할 수 있다.', () => {
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

  describe('isCountrysideSelectedState', () => {
    it('초기값은 false이다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCountrysideSelectedState),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current[0]).toBe(false);
    });

    it('boolean 값을 변경할 수 있다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCountrysideSelectedState),
        {
          wrapper: RecoilRoot,
        },
      );

      act(() => {
        result.current[1](true);
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[1]((prevBoolean) => !prevBoolean);
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('isCouponApplicableState', () => {
    it('초기값은 true이다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCouponApplicableState(1)),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current).toBeTruthy();
    });

    it('boolean 값을 변경할 수 있다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCouponApplicableState(1)),
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

  describe('isCouponSelectedState', () => {
    it('초기값은 false이다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCouponSelectedState(1)),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current[0]).toBe(false);
    });

    it('boolean 값을 변경할 수 있다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isCouponSelectedState(1)),
        {
          wrapper: RecoilRoot,
        },
      );

      act(() => {
        result.current[1](true);
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[1]((prevBoolean) => !prevBoolean);
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('isApplyingCouponModalOpenState', () => {
    it('초기값은 false이다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isApplyingCouponModalOpenState),
        {
          wrapper: RecoilRoot,
        },
      );
      expect(result.current[0]).toBe(false);
    });

    it('boolean 값을 변경할 수 있다.', () => {
      const { result } = renderHook(
        () => useRecoilState(isApplyingCouponModalOpenState),
        {
          wrapper: RecoilRoot,
        },
      );

      act(() => {
        result.current[1](true);
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[1]((prevBoolean) => !prevBoolean);
      });
      expect(result.current[0]).toBe(false);
    });
  });
});
