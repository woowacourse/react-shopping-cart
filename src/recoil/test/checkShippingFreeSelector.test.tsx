import { renderHook, waitFor } from '@testing-library/react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  itemsState,
} from '../atoms';
import { checkShippingFreeSelector } from '../selectors';
import { act } from 'react';
import { mockCoupons } from '../../mocks/coupons';
import { dataA, dataB, dataC } from '../../mocks/items';
import { useValidateCoupons } from '../useRecoilCallback';

describe('checkShippingFreeSelector', () => {
  it('5,000원 할인 쿠폰과 5만원 이상 구매 시 무료 배송 쿠폰이 선택되었다고 가정할 때 true를 반환한다.', () => {
    const { result } = renderHook(
      () => {
        const setCoupons = useSetRecoilState(couponsState);
        const setCouponsDetailsFixed5000 = useSetRecoilState(
          couponDetailState(mockCoupons[0].id),
        );
        const setCouponsDetailsBuyXgetY = useSetRecoilState(
          couponDetailState(mockCoupons[1].id),
        );
        const setCouponsDetailsFreeShipping = useSetRecoilState(
          couponDetailState(mockCoupons[2].id),
        );
        const setCouponsDetailsMiracleSale = useSetRecoilState(
          couponDetailState(mockCoupons[3].id),
        );
        const isSelectedShippingFree = useRecoilValue(
          checkShippingFreeSelector,
        );

        return {
          setCoupons,
          setCouponsDetailsFixed5000,
          setCouponsDetailsBuyXgetY,
          setCouponsDetailsFreeShipping,
          setCouponsDetailsMiracleSale,
          isSelectedShippingFree,
        };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      result.current.setCoupons(mockCoupons);
    });

    act(() => {
      result.current.setCouponsDetailsFixed5000(true);
      result.current.setCouponsDetailsBuyXgetY(false);
      result.current.setCouponsDetailsFreeShipping(true);
      result.current.setCouponsDetailsMiracleSale(false);
    });

    expect(result.current.isSelectedShippingFree).toBe(true);
  });

  it('상품 B를 10개 구매한 상태에서 배송비 무료 쿠폰을 선택 후, 상품 B를 5개로 조절하면 쿠폰 체크 상태를 false로 변경한다.', async () => {
    const { result } = renderHook(
      () => {
        const [isChecked, setIsChecked] = useRecoilState(
          couponDetailState(mockCoupons[2].id),
        );
        const setItemDetailsA = useSetRecoilState(itemDetailsState(dataB.id));
        const validateCoupon = useValidateCoupons();
        return { isChecked, setIsChecked, setItemDetailsA, validateCoupon };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(itemsState, [dataA, dataB, dataC]);
              set(itemDetailsState(dataA.id), {
                quantity: 1,
                isChecked: true,
              });
              set(itemDetailsState(dataB.id), {
                quantity: 10,
                isChecked: true,
              });
              set(itemDetailsState(dataC.id), {
                quantity: 1,
                isChecked: true,
              });
              set(couponsState, mockCoupons);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await act(async () => {
      result.current.setIsChecked(true);
    });

    expect(result.current.isChecked).toBe(true);

    await act(async () => {
      result.current.setItemDetailsA({ quantity: 5, isChecked: true });
    });

    await act(async () => {
      result.current.validateCoupon();
    });

    await waitFor(() => {
      expect(result.current.isChecked).toBe(false);
    });
  });
});
