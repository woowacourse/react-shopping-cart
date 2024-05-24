import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { isSigolState, selectedCartItemListState } from '../atoms/atoms';
import {
  selectedCartItemListSelector,
  totalOrderCountSelector,
  totalOrderPriceSelector,
  deliveryFeeSelector,
} from './selectors';
import {
  mockCartItems,
  newYujoCartItemData,
  newKyleCartItemData,
  newParselyCartItemData,
} from '../../../mocks/cartItems';

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
      result.current.setSelectedCartItemList(mockCartItems);
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
      result.current.setSelectedCartItemList([...mockCartItems, newKyleCartItemData]);
      result.current.setIsSelected(result.current.isSelected);
    });

    expect(result.current.isSelected).toBe(false);
  });
});

describe('totalOrderCountSelector', () => {
  it('선택된 상품의 총 상품 개수를 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalCount = useRecoilValue(totalOrderCountSelector);
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

describe('totalOrderPriceSelector', () => {
  it('상품 개수에 따른 총 가격을 계산할 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(totalOrderPriceSelector);
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

describe('deliveryFeeSelector', () => {
  it('상품의 총 가격이 10만원 이상이면 배송비가 0원이다.', () => {
    const { result } = renderHook(
      () => {
        const deliveryFee = useRecoilValue(deliveryFeeSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { deliveryFee, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([newYujoCartItemData]);
    });

    expect(result.current.deliveryFee).toBe(0);
  });

  it('상품의 총 가격이 10만원 이하이면 배송비가 3000원이다.', () => {
    const { result } = renderHook(
      () => {
        const deliveryFee = useRecoilValue(deliveryFeeSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);

        return { deliveryFee, setSelectedCartItemList };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([newParselyCartItemData]);
    });

    expect(result.current.deliveryFee).toBe(3000);
  });

  it('상품의 총 가격이 10만원 이하이고, 제주도 및 도서 산간지역이면 배송비가 6000원이다.', () => {
    const { result } = renderHook(
      () => {
        const deliveryFee = useRecoilValue(deliveryFeeSelector);
        const setSelectedCartItemList = useSetRecoilState(selectedCartItemListState);
        const setIsSigol = useSetRecoilState(isSigolState);

        return { deliveryFee, setSelectedCartItemList, setIsSigol };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCartItemList([newParselyCartItemData]);
      result.current.setIsSigol(true);
    });

    expect(result.current.deliveryFee).toBe(6000);
  });
});
