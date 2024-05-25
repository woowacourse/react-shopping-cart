import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  itemsState,
} from '../atoms';
import { totalDiscountSelector } from '../selectors';
import { act } from 'react';
import { mockCoupons } from '../../mocks/coupons';
import { dataA, dataB, dataC } from '../../mocks/items';

describe('checkedItemsSelector', () => {
  it('dataA, dataB, mockCoupons[0] mockCoupons[2] 선택되었다고 가정할 때 5000을 반환한다.', () => {
    const { result } = renderHook(
      () => {
        const setItems = useSetRecoilState(itemsState);
        const setItemDetailsA = useSetRecoilState(itemDetailsState(dataA.id));
        const setItemDetailsB = useSetRecoilState(itemDetailsState(dataB.id));
        const setItemDetailsC = useSetRecoilState(itemDetailsState(dataC.id));

        const setCoupons = useSetRecoilState(couponsState);
        const setCouponsDetails0 = useSetRecoilState(
          couponDetailState(mockCoupons[0].id),
        );
        const setCouponsDetails1 = useSetRecoilState(
          couponDetailState(mockCoupons[1].id),
        );
        const setCouponsDetails2 = useSetRecoilState(
          couponDetailState(mockCoupons[2].id),
        );
        const setCouponsDetails3 = useSetRecoilState(
          couponDetailState(mockCoupons[3].id),
        );
        const discount = useRecoilValue(totalDiscountSelector);

        return {
          setItems,
          setItemDetailsA,
          setItemDetailsB,
          setItemDetailsC,
          setCoupons,
          setCouponsDetails0,
          setCouponsDetails1,
          setCouponsDetails2,
          setCouponsDetails3,
          discount,
        };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      result.current.setItems([dataA, dataB, dataC]);
      result.current.setCoupons(mockCoupons);
    });

    act(() => {
      result.current.setItemDetailsA({
        quantity: dataA.quantity,
        isChecked: true,
      });
      result.current.setItemDetailsB({
        quantity: dataB.quantity,
        isChecked: true,
      });
      result.current.setItemDetailsC({
        quantity: dataC.quantity,
        isChecked: false,
      });
      result.current.setCouponsDetails0(true);
      result.current.setCouponsDetails1(false);
      result.current.setCouponsDetails2(true);
      result.current.setCouponsDetails3(false);
    });

    expect(result.current.discount.totalDiscount).toBe(5000);
  });
});
