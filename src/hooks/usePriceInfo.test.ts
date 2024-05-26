import { RecoilRoot, useSetRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import { selectedCartItems } from '@recoil/atoms';
import { ORDER } from '@constants/constants';
import { CartItem } from '@type/cartItem';
import usePriceInfo from './usePriceInfo';

/*
결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.
*/
describe('결제 금액 계산', () => {
  // given
  const selectedItems: CartItem[] = [
    {
      id: 1,
      quantity: 2,
      product: {
        id: 1,
        name: '춘식이',
        price: 3000,
        imageUrl:
          'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
        category: '고양이',
      },
    },
    {
      id: 2,
      quantity: 2,
      product: {
        id: 2,
        name: '춘배',
        price: 4000,
        imageUrl:
          'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
        category: '고양이',
      },
    },
  ];

  // 상품 가격 계산: 상품 가격은 선택된 상품의 개수 * 가격의 합이다.
  it('선택한 상품의 개수와 가격에 따른 상품 가격을 정확하게 계산한다.', () => {
    // given
    const item1Price = selectedItems[0].product.price * selectedItems[0].quantity;
    const item2Price = selectedItems[1].product.price * selectedItems[1].quantity;
    const totalOrderPrice = item1Price + item2Price;

    const { result } = renderHook(
      () => {
        const priceInfo = usePriceInfo();
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
    const item1Price = selectedItems[0].product.price * selectedItems[0].quantity;
    const item2Price = selectedItems[1].product.price * selectedItems[1].quantity;
    const shipping = ORDER.SHIPPING_FEE;
    const totalPrice = item1Price + item2Price + shipping;

    const { result } = renderHook(
      () => {
        const priceInfo = usePriceInfo();
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

  it('0원일 때는 배송비가 없다', () => {
    // given
    const freeItem: CartItem[] = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '춘식이',
          price: 0,
          imageUrl:
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
          category: '고양이',
        },
      },
    ];
    const { result } = renderHook(
      () => {
        const priceInfo = usePriceInfo();
        const setSelectedItems = useSetRecoilState(selectedCartItems);
        return { priceInfo, setSelectedItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    // when
    act(() => {
      result.current.setSelectedItems(freeItem);
    });

    // then
    expect(result.current.priceInfo.shipping).toEqual(0);
  });

  it('배송비 무료 기준의 아래 가격일 때는 배송비가 있다.', () => {
    // given
    const itemUnderShippingFreePrice: CartItem[] = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '춘식이',
          price: ORDER.SHIPPING_FREE_PRICE - 1,
          imageUrl:
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
          category: '고양이',
        },
      },
    ];
    const { result } = renderHook(
      () => {
        const priceInfo = usePriceInfo();
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
    expect(result.current.priceInfo.shipping).toEqual(ORDER.SHIPPING_FEE);
  });

  it('배송비 무료 가격일 때는 배송비가 없다.', () => {
    // given
    const itemShippingFreePrice: CartItem[] = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '춘식이',
          price: ORDER.SHIPPING_FREE_PRICE,
          imageUrl:
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
          category: '고양이',
        },
      },
    ];
    const { result } = renderHook(
      () => {
        const priceInfo = usePriceInfo();
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
    expect(result.current.priceInfo.shipping).toEqual(0);
  });
});
