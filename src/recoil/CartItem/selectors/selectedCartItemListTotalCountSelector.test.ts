import { act } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { renderHook } from '@testing-library/react';

import { cartItemListMockData } from '../../../mockData/cartItemListMockData';
import { selectedCartItemListState } from '../atoms/selectedCartItemListState';
import { selectedCartItemListTotalCountSelector } from './selectedCartItemListTotalCountSelector';

describe('selectedCartItemListTotalCountSelector', () => {
  it('선택된 카트 상품 목록의 총 수량이 올바르게 반환된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedCartItemListTotalCount = useRecoilValue(selectedCartItemListTotalCountSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { selectedCartItemListTotalCount, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList(cartItemListMockData);
    });

    const expectedTotalCount = cartItemListMockData.reduce((acc, cur) => acc + cur.quantity, 0);

    expect(result.current.selectedCartItemListTotalCount).toBe(expectedTotalCount);
  });
});
