import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../atoms/atoms';
import { selectedCartItemListSelector, cartOrderTotalPriceSelector, cartOrderTotalCountSelector } from './selectors';
import { cartItemListMockData, newYujoCartItemData, newKyleCartItemData } from '../../data/cartItemListMockData';

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

describe('cartOrderTotalCountSelector', () => {
  it('선택된 상품의 총 상품 개수를 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalCount = useRecoilValue(cartOrderTotalCountSelector);
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

describe('cartOrderTotalPriceSelector', () => {
  it('상품 개수에 따른 총 가격을 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(cartOrderTotalPriceSelector);
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
