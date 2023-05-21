import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Cart, Product } from '../../types';
import { cartState } from '../../atoms/CartState';
import { useLocalStorage } from './useLocalStorage';
import { useFetch } from './useFetch';

const getIndex = (list: Cart[], id: number) => {
  return list.findIndex((item: Cart) => item.id === id);
};

export const useCartState = (product: Product) => {
  const { id } = product;
  const { setLocalStorageData } = useLocalStorage();
  const [cartList, setCartList] = useRecoilState(cartState);

  const { postAPI } = useFetch();

  const newProduct = {
    id,
    quantity: 1,
    product: product,
  };

  const addToCartState = () => {
    setCartList((prev) => [...prev, newProduct]);

    setLocalStorageData<Cart[]>('cartList', [...cartList, newProduct]);
  };

  const increaseCount = async () => {
    const updatedCartList = cartList.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartList(updatedCartList);
    setLocalStorageData<Cart[]>('cartList', updatedCartList);

    await postAPI('/cart-items', updatedCartList);
  };

  const decreaseCount = async (shouldDelete: boolean) => {
    let updatedCartList = cartList.map((item) => {
      if (item.id === id) {
        return shouldDelete
          ? { ...item, quantity: item.quantity - 1 }
          : item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      } else {
        return item;
      }
    });

    if (shouldDelete) {
      updatedCartList = updatedCartList.filter(
        (item) => !(item.id === id && item.quantity === 0)
      );
    }

    setCartList(updatedCartList);
    setLocalStorageData<Cart[]>('cartList', updatedCartList);

    await postAPI('/cart-items', updatedCartList);
  };

  const deleteCartItem = () => {
    setCartList((prev) => {
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
