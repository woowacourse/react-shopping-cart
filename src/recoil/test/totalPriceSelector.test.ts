import { renderHook } from '@testing-library/react';
import { totalPriceSelector } from '../selectors';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  DEFAULT_SHIPPING_FEE,
  FREE_DELIVERY_THRESHOLD,
} from '../../constants/ShoppingCart';
import { itemDetailsState, itemsState } from '../atoms';
import { act } from 'react';
import { CartItems } from '../../types/Item';

describe('totalPriceSelector(Default)', () => {
  it('초기 총 가격은 0이어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const { totalAmount, deliveryFee, calculatedTotalAmount } =
          useRecoilValue(totalPriceSelector('Default'));
        return {
          totalAmount,
          deliveryFee,
          calculatedTotalAmount,
        };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    expect(result.current.totalAmount).toBe(0);
  });

  test.each([
    {
      input: FREE_DELIVERY_THRESHOLD - 1,
      expected: FREE_DELIVERY_THRESHOLD + DEFAULT_SHIPPING_FEE - 1,
    },
    {
      input: FREE_DELIVERY_THRESHOLD,
      expected: FREE_DELIVERY_THRESHOLD,
    },
  ])(
    '상품 금액이 $input원일 때 총 결제 금액은 $expected원이어야 한다.',
    ({ input, expected }) => {
      const { result } = renderHook(
        () => {
          const { totalAmount, deliveryFee, calculatedTotalAmount } =
            useRecoilValue(totalPriceSelector('Default'));
          const setItems = useSetRecoilState(itemsState);
          const setItemDetails = useSetRecoilState(itemDetailsState(1));
          return {
            totalAmount,
            deliveryFee,
            calculatedTotalAmount,
            setItems,
            setItemDetails,
          };
        },
        { wrapper: RecoilRoot },
      );

      const data = {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '나이키',
          price: input,
          imageUrl: 'sample.com',
          category: 'fashion',
        },
      };

      act(() => {
        result.current.setItems((preState: CartItems[]) => [...preState, data]);
      });
      act(() => {
        result.current.setItemDetails({
          quantity: data.quantity,
          isChecked: true,
        });
      });
      expect(result.current.calculatedTotalAmount).toBe(expected);
    },
  );
});
