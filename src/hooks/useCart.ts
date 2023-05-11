import { atom, useRecoilState } from 'recoil';
import * as T from '../types/ProductType';
import mockApi, { fetchMock } from '../api/mockApi';

interface Cart {
  id: number;
  quantity: number;
  product: T.ProductItem;
}

export const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

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
    console.log(response.data);
  };

  const removeCart = async (id: number) => {
    const removedCartList = cartList.filter((cart) => cart.id !== id);
    setCartList(removedCartList);
    await fetchMock();
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
      await mockApi('/cart-items/update-quantity', { body: JSON.stringify({ id, quantity }) });
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
