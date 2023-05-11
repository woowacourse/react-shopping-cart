import { useRecoilState } from 'recoil';
import * as T from '../types/types';
import mockApi from '../api/mockApi';
import { cartState } from '../recoil/atoms';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);

  const getQuantityByProductId = (id: number) => {
    const targetCart = cartList.find((cart) => cart.id === id);
    return targetCart ? targetCart.quantity : 0;
  };

  const addCart = async (product: T.ProductItem) => {
    if (cartList.findIndex((c) => c.id === product.id) !== -1) {
      return;
    }
    const newCartItem = { id: product.id, quantity: 1, product };
    setCartList([...cartList, newCartItem]);
    const response = await mockApi('/cart-items/add', { body: JSON.stringify(newCartItem) });
    if (response.data !== 'success') {
      console.log(response.data);
    }
  };

  const removeCart = async (id: number) => {
    const removedCartList = cartList.filter((cart) => cart.id !== id);
    setCartList(removedCartList);
    const response = await mockApi('/cart-items/remove', { body: JSON.stringify({ id }) });
    if (response.data !== 'success') {
      console.log(response.data);
    }
  };

  const updateCartListQuantity = (id: number, newQuantity: number) =>
    cartList.map((cart) => {
      if (cart.id === id) {
        return {
          ...cart,
          quantity: newQuantity,
        };
      } else {
        return cart;
      }
    });

  const setCartQuantity = async (id: number, quantity: number) => {
    if (quantity === 0) {
      removeCart(id);
    } else {
      const changedCartList = updateCartListQuantity(id, quantity);
      setCartList(changedCartList);
      const response = await mockApi('/cart-items/update-quantity', { body: JSON.stringify({ id, quantity }) });
      if (response.data !== 'success') {
        console.log(response.data);
      }

    }
  };

  const increaseCart = async (id: number) => {
    setCartQuantity(id, getQuantityByProductId(id) + 1);
  };

  const decreaseCart = async (id: number) => {
    setCartQuantity(id, getQuantityByProductId(id) - 1);
  };

  return {
    cartList,
    getQuantityByProductId,
    addCart,
    increaseCart,
    decreaseCart,
    setCartQuantity,
  };
}
export default useCart;
