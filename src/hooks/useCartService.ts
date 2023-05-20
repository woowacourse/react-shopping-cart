import { useRecoilState } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import type { Product } from '../types/product';

const useCartService = () => {
  const [cartList, setCartList] = useRecoilState(cartState);

  const fetchCartItem = () => {
    fetch('cart-items')
      .then((res) => {
        if (!res.ok) throw new Error('서버에 문제가 발생했습니다.');
        return res.json();
      })
      .then((fetchedCartList) => {
        setCartList(fetchedCartList);
      });
  };

  const addCartItem = (product: Product) => {
    fetch(`cart-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product.id }),
    }).then((res) => {
      if (!res.ok) throw new Error('서버에 문제가 발생했습니다.');

      fetchCartItem();
    });
  };

  const updateCartItemQuantity = (cartId: string) => (quantity: number) => {
    fetch(`cart-items/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: quantity }),
    }).then((res) => {
      if (!res.ok) throw new Error('서버에 문제가 발생했습니다.');

      setCartList((prevCart) => {
        return prevCart.map((cartItem) => {
          if (cartItem.id !== cartId) return cartItem;

          return {
            ...cartItem,
            quantity,
          };
        });
      });
    });
  };

  const deleteCartItem = (cartId: string) => {
    fetch(`cart-items/${cartId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok) throw new Error('서버에 문제가 발생했습니다.');

      setCartList((prevCart) =>
        prevCart.filter((cartItem) => cartItem.id !== cartId),
      );
    });
  };

  const getCartId = (productId: number) => {
    return cartList.filter((cartItem) => cartItem.product.id === productId)[0]
      ?.id;
  };

  return {
    cartList,
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    getCartId,
  } as const;
};
export default useCartService;
