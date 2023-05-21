import {useRecoilState} from 'recoil';
import type {NewCartItem, ProductItem} from '../types/types';
import {cartState} from '../recoil/cartAtoms';
import {fetchAddCart, fetchDeleteCart, fetchUpdateCart} from '../api/api';
import {updateCartListQuantity} from '../domain/cart';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);

  const addCart = (product: ProductItem) => {
    const isCartItemExist = cartList.some((cartItem) => cartItem.id === product.id);

    if (!isCartItemExist) {
      const newCartItem: NewCartItem = {
        id: product.id,
        quantity: 1,
        checked: true,
        product
      };
      const updatedCartList = [...cartList, newCartItem];
      setCartList(updatedCartList);
      fetchAddCart(newCartItem.id);
    }
  };

  const removeCart = (id: number) => {
    const removedCartList = cartList.filter((cart) => cart.id !== id);
    setCartList(removedCartList);
    fetchDeleteCart(id);
  };

  const setCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeCart(id);
    } else {
      const changedCartList = updateCartListQuantity([...cartList], id, quantity);
      setCartList(changedCartList);
      fetchUpdateCart(id, quantity);
    }
  };

  return {
    addCart,
    removeCart,
    setCartQuantity,
  };
}

export default useCart;
