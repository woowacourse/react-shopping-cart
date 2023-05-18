import { useRecoilState } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import { uuid } from '../utils/uuid';
import type { Product } from '../types/product';

const useCartService = () => {
  const [cartList, setCartList] = useRecoilState(cartState);

  const getNewCartItem = (product: Product) => {
    return {
      id: uuid(),
      quantity: 1,
      product,
    };
  };

  const addCartItem = (product: Product) => {
    setCartList((prevCart) => {
      const newCartItem = getNewCartItem(product);

      return [...prevCart, newCartItem];
    });
  };

  const updateCartItemQuantity = (cartId: string) => (quantity: number) => {
    setCartList((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id !== cartId) return cartItem;

        return {
          ...cartItem,
          quantity,
        };
      });
    });
  };

  const deleteCartItem = (cartId: string) => {
    setCartList((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== cartId),
    );
  };

  const getCartId = (productId: number) => {
    return cartList.filter((cartItem) => cartItem.product.id === productId)[0]
      .id;
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
