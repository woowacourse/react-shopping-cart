import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { totalPriceSelector } from './selectors';
import { itemDetailsState, itemsState } from './atoms';
import { act } from 'react';
import { Products } from '../types/Product';

describe('totalPriceSelector', () => {
  it('초기 총 가격은 0이어야 한다.', () => {
    const { result } = renderHook(
      () => {
        const { totalAmount, deliveryFee, calculatedTotalAmount } =
          useRecoilValue(totalPriceSelector);
        return { totalAmount, deliveryFee, calculatedTotalAmount };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    expect(result.current.totalAmount).toBe(0);
  });

  test.each([
    {
      input: 99999,
      expected: 102999,
    },
    {
      input: 100000,
      expected: 100000,
    },
  ])(
    '상품 금액이 $input원일 때 총 결제 금액은 $expected원이어야 한다.',
    ({ input, expected }) => {
      const { result } = renderHook(
        () => {
          const { totalAmount, deliveryFee, calculatedTotalAmount } =
            useRecoilValue(totalPriceSelector);
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
        result.current.setItems((preState: Products[]) => [...preState, data]);
      });
      act(() => {
        result.current.setItemDetails({
          quantity: data.quantity,
          price: data.product.price,
          isChecked: true,
        });
      });
      expect(result.current.calculatedTotalAmount).toBe(expected);
    },
  );
});
