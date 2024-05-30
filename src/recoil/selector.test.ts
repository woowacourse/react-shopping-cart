import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import { SelectedCartItem, selectedCartItems } from './atoms';
import { priceInfoStore, isOverShippingFeeFreeStore, orderTotalStore } from './selectors';
import { ORDER } from '../constants/constants';

/*
결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.
*/
describe('결제 금액 계산', () => {
  // given
  const selectedItems: SelectedCartItem[] = [
    {
      cartItemId: 1,
      quantity: 2,
      price: 3000,
      name: 'one',
      imageUrl: '',
    },
    {
      cartItemId: 2,
      quantity: 4,
      price: 3000,
      name: 'two',
      imageUrl: '',
    },
  ];

  // 상품 가격 계산: 상품 가격은 선택된 상품의 개수 * 가격의 합이다.
  it('선택한 상품의 개수와 가격에 따른 상품 가격을 정확하게 계산한다.', () => {
    // given
    const item1Price = selectedItems[0].price * selectedItems[0].quantity;
    const item2Price = selectedItems[1].price * selectedItems[1].quantity;
    const totalOrderPrice = item1Price + item2Price;

    const { result } = renderHook(
      () => {
        const priceInfo = useRecoilValue(priceInfoStore);
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        return { priceInfo, setSelectedItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(selectedItems);
    });

    // then
    expect(result.current.priceInfo.order).toEqual(totalOrderPrice);
  });

  // 총 가격 계산: 상품 가격은 선택된 상품의 개수 * 가격의 합 + 배송비이다.
  it('상품 가격은 선택된 상품의 개수 * 가격의 합 + 배송비이다.', () => {
    // given
    const item1Price = selectedItems[0].price * selectedItems[0].quantity;
    const item2Price = selectedItems[1].price * selectedItems[1].quantity;
    const shipping = ORDER.BASIC_SHIPPING_FEE;
    const totalPrice = item1Price + item2Price + shipping;

    const { result } = renderHook(
      () => {
        const priceInfo = useRecoilValue(priceInfoStore);
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        return { priceInfo, setSelectedItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(selectedItems);
    });

    // then
    expect(result.current.priceInfo.total).toEqual(totalPrice);
  });

  it('배송비 무료 기준의 아래 가격일 때는 배송비가 있다.', () => {
    // given
    const itemUnderShippingFreePrice: SelectedCartItem[] = [
      {
        cartItemId: 1,
        quantity: 1,
        price: ORDER.SHIPPING_FREE_PRICE - 1,
        name: 'one',
        imageUrl: '',
      },
    ];
    const { result } = renderHook(
      () => {
        const priceInfo = useRecoilValue(priceInfoStore);
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        return { priceInfo, setSelectedItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(itemUnderShippingFreePrice);
    });

    // then
    expect(result.current.priceInfo.finalShipping).toEqual(ORDER.BASIC_SHIPPING_FEE);
  });

  // NOTE: 실패하는 테스트
  it('배송비 무료 가격일 때는 배송비가 없다.', () => {
    // given
    const itemShippingFreePrice: SelectedCartItem[] = [
      {
        cartItemId: 1,
        quantity: 1,
        price: ORDER.SHIPPING_FREE_PRICE,
        name: 'one',
        imageUrl: '',
      },
    ];
    const { result } = renderHook(
      () => {
        const priceInfo = useRecoilValue(priceInfoStore);
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        return { priceInfo, setSelectedItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(itemShippingFreePrice);
    });

    // then
    expect(result.current.priceInfo.finalShipping).toEqual(0);
  });
});

describe('isOverShippingFeeFree', () => {
  it('주문 금액이 배송비 무료 조건을 넘으면 true를 반환한다.', () => {
    // given
    const selectedItems: SelectedCartItem[] = [
      {
        cartItemId: 1,
        quantity: 1,
        price: ORDER.SHIPPING_FREE_PRICE,
        name: 'one',
        imageUrl: '',
      },
    ];
    const { result } = renderHook(
      () => {
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        const orderTotal = useRecoilValue(orderTotalStore);
        const isOverShippingFeeFree = useRecoilValue(isOverShippingFeeFreeStore);
        return { setSelectedItems, isOverShippingFeeFree, orderTotal };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(selectedItems);
    });

    // then
    expect(result.current.isOverShippingFeeFree).toEqual(true);
  });

  it('주문 금액이 배송비 무료 조건 미만이면 false를 반환한다.', () => {
    // given
    const selectedItems: SelectedCartItem[] = [
      {
        cartItemId: 1,
        quantity: 1,
        price: ORDER.SHIPPING_FREE_PRICE - 1,
        name: 'one',
        imageUrl: '',
      },
    ];
    const { result } = renderHook(
      () => {
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        const orderTotal = useRecoilValue(orderTotalStore);
        const isOverShippingFeeFree = useRecoilValue(isOverShippingFeeFreeStore);
        return { setSelectedItems, isOverShippingFeeFree, orderTotal };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(selectedItems);
    });

    // then
    expect(result.current.isOverShippingFeeFree).toEqual(false);
  });
});

describe('orderTotalStore', () => {
  it('주문 금액의 총합을 정확하게 계산할 수 있다.', () => {
    const expectedOrderTotal = 5000 * 1 + 50000 * 2 + 10000 * 4;
    // given
    const selectedItems: SelectedCartItem[] = [
      {
        cartItemId: 1,
        quantity: 1,
        price: 5000,
        name: 'one',
        imageUrl: '',
      },
      {
        cartItemId: 1,
        quantity: 2,
        price: 50000,
        name: 'one',
        imageUrl: '',
      },
      {
        cartItemId: 1,
        quantity: 4,
        price: 10000,
        name: 'one',
        imageUrl: '',
      },
    ];
    const { result } = renderHook(
      () => {
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        const orderTotal = useRecoilValue(orderTotalStore);
        return { setSelectedItems, orderTotal };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(selectedItems);
    });

    // then
    expect(result.current.orderTotal).toEqual(expectedOrderTotal);
  });
});
