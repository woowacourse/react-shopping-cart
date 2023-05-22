import { useRecoilState } from 'recoil';
import type { CartItem, Product } from '../types/types';
import { cartListState } from '../recoil/atom';
import { CART_ITEMS_BASE_URL } from '../constant';

const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const addProductToCartList = (productId: Product['id']) => {
    fetch(CART_ITEMS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status.toString());
      })
      .then(() => {
        fetch(CART_ITEMS_BASE_URL)
          .then((response) => {
            if (!response.ok) throw new Error(response.status.toString());
            return response.json();
          })
          .then((data) => setCartList(data));
      });
  };

  const updateProductQuantity = (targetId: Product['id'], quantity: CartItem['quantity']) => {
    fetch(`${CART_ITEMS_BASE_URL}/${targetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantity),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status.toString());
      })
      .then(() => {
        fetch(CART_ITEMS_BASE_URL)
          .then((response) => {
            if (!response.ok) throw new Error(response.status.toString());
            return response.json();
          })
          .then((data) => setCartList(data));
      });
  };

  const removeProductInCartList = (targetId: Product['id']) => {
    fetch(`${CART_ITEMS_BASE_URL}/${targetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status.toString());
      })
      .then(() => {
        fetch(CART_ITEMS_BASE_URL)
          .then((response) => {
            if (!response.ok) throw new Error(response.status.toString());
            return response.json();
          })
          .then((data) => setCartList(data));
      });
  };

  return { cartList, addProductToCartList, updateProductQuantity, removeProductInCartList };
};

export default useCartList;
