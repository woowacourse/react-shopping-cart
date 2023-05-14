import { useCartProduct } from '../../hooks/useCartProduct';
import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { cartState } from 'state/CartAtom';
import { Product } from 'types/product';

describe('useCartProduct hook 테스트', () => {
  const product: Product = {
    id: 1,
    name: '순살치킨 해마로 1kg 냉동',
    price: 10800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
  };

  const setUp = (product: Product) => {
    return renderHook(
      () => {
        const hooks = useCartProduct(product);
        const cart = useRecoilValue(cartState);

        return { ...hooks, cart };
      },
      {
        wrapper: RecoilRoot,
      }
    );
  };

  it('장바구니에 상품을 추가할 수 있다.', () => {
    const { result } = setUp(product);

    act(() => result.current.addCartProduct());

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('장바구니에 있는 상품의 개수를 더할 수 있다.', () => {
    const { result } = setUp(product);

    act(() => {
      result.current.addCartProduct();
      result.current.increaseQuantity();
    });

    expect(result.current.cart[0].quantity).toEqual(2);
  });

  it('장바구니에 있는 상품의 개수를 뺄 수 있다.', () => {
    const { result } = setUp(product);

    act(() => {
      result.current.addCartProduct();
      result.current.increaseQuantity();
      result.current.decreaseQuantity();
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('장바구니에 있는 상품의 개수가 0이 되면 장바구니에서 제거한다.', () => {
    const { result } = setUp(product);

    act(() => {
      result.current.addCartProduct();
      result.current.decreaseQuantity();
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('장바구니에 없는 상품의 개수를 더하고 뺄 수 없다.', () => {
    const { result } = setUp(product);

    act(() => {
      result.current.increaseQuantity();
      result.current.decreaseQuantity();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
