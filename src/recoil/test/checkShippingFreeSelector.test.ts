import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { couponDetailState, couponsState } from '../atoms';
import { checkShippingFreeSelector } from '../selectors';
import { act } from 'react';
import { mockCoupons } from '../../mocks/coupons';

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
});
