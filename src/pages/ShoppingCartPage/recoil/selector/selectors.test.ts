import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../atom/selectedCartItemListState';
import { selectedCartItemListSelector } from './selectedCartItemListSelector';
import { selectedCartItemListTotalPriceSelector } from './selectedCartItemListTotalPriceSelector';
import { selectedCartItemListTotalCountSelector } from './selectedCartItemListTotalCountSelector';
import { cartItemListMockData, newYujoCartItemData, newKyleCartItemData } from '../../../../data/cartItemListMockData';

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

describe('selectedCartItemListTotalCountSelector', () => {
  it('선택된 상품의 총 상품 개수를 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalCount = useRecoilValue(selectedCartItemListTotalCountSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { totalCount, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([newYujoCartItemData, newKyleCartItemData]);
    });

    expect(result.current.totalCount).toBe(2);
  });
});

describe('selectedCartItemListTotalPriceSelector', () => {
  it('상품 개수에 따른 총 가격을 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { totalPrice, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([newYujoCartItemData, newKyleCartItemData]);
    });

    expect(result.current.totalPrice).toBe(20000000);
  });
});
