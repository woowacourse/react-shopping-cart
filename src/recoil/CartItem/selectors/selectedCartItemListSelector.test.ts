import { act } from 'react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';

import { renderHook } from '@testing-library/react';

import { cartItemListMockData, newKyleCartItemData, newYujoCartItemData } from '../../../mockData/cartItemListMockData';
import { selectedCartItemListState } from '../atoms/selectedCartItemListState';
import { selectedCartItemListSelector } from './selectedCartItemListSelector';

describe('selectedCartItemListSelector', () => {
  it('개별 상품을 선택할 시 선택된 상품이 배열에 삽입된다.', () => {
    const { result } = renderHook(
      () => {
        const [isSelected, setIsSelected] = useRecoilState(selectedCartItemListSelector(newYujoCartItemData));
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { isSelected, setIsSelected, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList(cartItemListMockData);
      result.current.setIsSelected(result.current.isSelected);
    });

    expect(result.current.isSelected).toBe(true);
  });

  it('개별 상품을 선택 해제할 시 선택된 상품이 배열에서 제거된다.', () => {
    const { result } = renderHook(
      () => {
        const [isSelected, setIsSelected] = useRecoilState(selectedCartItemListSelector(newKyleCartItemData));
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { isSelected, setIsSelected, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([...cartItemListMockData, newKyleCartItemData]);
      result.current.setIsSelected(result.current.isSelected);
    });

    expect(result.current.isSelected).toBe(false);
  });
});
