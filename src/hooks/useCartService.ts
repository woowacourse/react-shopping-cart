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

  const updateCartItemQuantity = (targetId: number) => (quantity: number) => {
    setCartList((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.product.id !== targetId) return cartItem;

        return {
          ...cartItem,
          quantity,
        };
      });
    });
  };

  const deleteCartItem = (targetId: number) => {
    setCartList((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== targetId),
    );
  };

  return {
    cartList,
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
  } as const;
};
export default useCartService;
