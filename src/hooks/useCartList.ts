import * as T from '../types/ProductType';
import useCartListState from './useCartListState';
import mockApi from '../api/mockApi';

const useCartList = () => {
  const [cartList, setCartList] = useCartListState();

  const getQuantityByProductId = (id: number) => {
    return cartList.find((cart) => cart.id === id)?.quantity ?? 0;
  };

  const addCart = async (product: T.ProductItem) => {
    if (cartList.findIndex((cart) => cart.id === product.id) !== -1) {
      return;
    }
    const newCartItem: T.newCartProduct = { id: product.id, quantity: 1, product };
    setCartList([...cartList, newCartItem]);
    await mockApi('/cart-items/add', { body: JSON.stringify(newCartItem) });
  };

  const removeCart = async (id: number) => {
    setCartList(cartList.filter((cart) => cart.id !== id));
    await mockApi('/cart-items/remove', { body: JSON.stringify({ id }) });
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
      setCartList(updateCartListQuantity(id, quantity));
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
};
export default useCartList;
