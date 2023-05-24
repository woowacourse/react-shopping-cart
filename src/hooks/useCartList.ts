import { useRecoilState } from 'recoil';
import type { CartItem, Product } from '../types/types';
import { cartListState } from '../recoil/atom';
import { CART_ITEMS_BASE_URL } from '../constant';

const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const addProductToCartList = async (productId: Product['id']) => {
    const response = await fetch(CART_ITEMS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });

    if (!response.ok) throw new Error(response.status.toString());

    const newResponse = await fetch(CART_ITEMS_BASE_URL);

    if (!newResponse.ok) throw new Error(newResponse.status.toString());

    const newCartList = await newResponse.json();

    setCartList(newCartList);
  };

  const updateProductQuantity = async (targetId: Product['id'], quantity: CartItem['quantity']) => {
    const response = await fetch(`${CART_ITEMS_BASE_URL}/${targetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantity),
    });

    if (!response.ok) throw new Error(response.status.toString());

    const newResponse = await fetch(CART_ITEMS_BASE_URL);

    if (!newResponse.ok) throw new Error(newResponse.status.toString());

    const newCartList = await newResponse.json();

    setCartList(newCartList);
  };

  const removeProductInCartList = async (targetId: Product['id']) => {
    const response = await fetch(`${CART_ITEMS_BASE_URL}/${targetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(response.status.toString());

    const newResponse = await fetch(CART_ITEMS_BASE_URL);

    if (!newResponse.ok) throw new Error(newResponse.status.toString());

    const newCartList = await newResponse.json();

    setCartList(newCartList);
  };

  return { cartList, addProductToCartList, updateProductQuantity, removeProductInCartList };
};

export default useCartList;
