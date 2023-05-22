import { useRecoilState } from 'recoil';
import { Cart, Product } from '../../types';
import { cartState } from '../../atoms/CartState';
import { useFetch } from './useFetch';

export const useCartState = (product: Product) => {
  const { id } = product;
  const [cartList, setCartList] = useRecoilState(cartState);

  const { postAPI, patchAPI, deleteAPI } = useFetch();

  const newProduct = {
    id,
    quantity: 1,
    product: product,
  };

  const addToCartState = async () => {
    setCartList((prev) => [...prev, newProduct]);

    await postAPI('/cart-items', newProduct);
  };

  const increaseCount = async () => {
    const updatedCartList = cartList.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    const updatedCartItem = updatedCartList.find((item) => item.id === id);

    setCartList(updatedCartList);

    await patchAPI('/cart-items', {
      id: id,
      quantity: updatedCartItem?.quantity,
    });
  };

  const decreaseCount = async () => {
    const updatedCartList = cartList.map((item) =>
      item.id === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    const updatedCartItem = updatedCartList.find((item) => item.id === id);

    if (updatedCartItem?.quantity === 0) {
      setCartList(updatedCartList.filter((item) => item.id !== id));
      return deleteAPI('/cart-items', { id: id });
    }
    setCartList(updatedCartList);

    await patchAPI('/cart-items', {
      id: id,
      quantity: updatedCartItem?.quantity,
    });
  };

  const deleteCartItem = () => {
    setCartList((prev) => {
      return [...prev].filter((item: Cart) => item.id !== id);
    });
    deleteAPI('/cart-items', { id: id });
  };

  return {
    addToCartState,
    increaseCount,
    decreaseCount,
    deleteCartItem,
  };
};
