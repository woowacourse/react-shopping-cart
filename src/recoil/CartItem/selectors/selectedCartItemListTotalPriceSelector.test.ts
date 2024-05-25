import { act } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { renderHook } from '@testing-library/react';

import { cartItemListMockData } from '../../../data/cartItemListMockData';
import { selectedCartItemListState } from '../atoms/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from './selectedCartItemListTotalPriceSelector';

describe('selectedCartItemListTotalPriceSelector', () => {
  it('선택된 카트 상품 목록의 총 가격이 올바르게 반환된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedCartItemListTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { selectedCartItemListTotalPrice, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList(cartItemListMockData);
    });

    const expectedTotalPrice = cartItemListMockData.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    expect(result.current.selectedCartItemListTotalPrice).toBe(expectedTotalPrice);
  });
});
