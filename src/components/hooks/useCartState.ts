import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Cart, Product } from '../../types';
import { cartState } from '../../atoms/CartState';
import { useLocalStorage } from './useLocalStorage';

const getIndex = (list: Cart[], id: number) => {
  return list.findIndex((item: Cart) => item.id === id);
};

export const useCartState = (product: Product) => {
  const { id } = product;
  const { setLocalStorageData } = useLocalStorage();
  const setCartProductState = useSetRecoilState(cartState);
  const currentCartList = useRecoilValue(cartState);

  const newProduct = {
    id,
    quantity: 1,
    product: product,
  };

  const addToCartState = () => {
    setCartProductState((prev) => [...prev, newProduct]);

    setLocalStorageData<Cart[]>('cartList', [...currentCartList, newProduct]);
  };

  const increaseCount = () => {
    setCartProductState((prev) => {
      const index = getIndex(prev, id);

      const updatedCartList = [...prev];

      updatedCartList[index] = {
        ...updatedCartList[index],
        quantity: updatedCartList[index].quantity + 1,
      };

      return updatedCartList;
    });
  };

  const decreaseCount = (shouldDelete: boolean) => {
    setCartProductState((prev) => {
      const index = getIndex(prev, id);

      const updatedCartList = [...prev];

      if (updatedCartList[index].quantity > 1) {
        updatedCartList[index] = {
          ...updatedCartList[index],
          quantity: updatedCartList[index].quantity - 1,
        };
      } else if (shouldDelete && updatedCartList[index].quantity === 1) {
        return updatedCartList.filter((item: Cart) => item.id !== id);
      }

      return updatedCartList;
    });
  };

  const deleteCartItem = () => {
    setCartProductState((prev) => {
      return [...prev].filter((item: Cart) => item.id !== id);
    });
  };

  return {
    addToCartState,
    increaseCount,
    decreaseCount,
    deleteCartItem,
  };
};
