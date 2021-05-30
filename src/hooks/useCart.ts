import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { requestDeleteCartItem } from '../apis';
import { requestDeleteCartItems } from '../apis/cart';
import { STATUS_CODE } from '../constants';
import { action, asyncAction } from '../modules/cart/actions';
import { CartItem, Product } from '../type';

const useCart = () => {
  const dispatch = useAppDispatch();

  const { cartItems, loading, error } = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(asyncAction.getCartItems());
  }, []);

  const getCartItem = (id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);

    return newCartItems[targetIndex];
  };

  const setCartItems = (items: CartItem[]) => {
    dispatch(action.setCartItems(items));
  };

  const deleteCartItem = async (id: CartItem['id']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const targetCartItem = newCartItems[targetIndex];

    try {
      await requestDeleteCartItem(id);
      newCartItems.splice(targetIndex, 1);
      setCartItems(newCartItems);
    } catch (error) {
      alert(`${targetCartItem.name}을(를) 장바구니에서 삭제하는데 실패했습니다!`);
    }
  };

  const deleteAllCartItems = async () => {
    try {
      const selectedCartItemIdList = cartItems.filter(item => item.isSelected).map(item => item.id);
      await requestDeleteCartItems(selectedCartItemIdList);
      const newCartItems = cartItems.filter(cartItem => !selectedCartItemIdList.includes(cartItem.id));
      setCartItems(newCartItems);
    } catch (error) {
      const failCount = error.statusList?.filter((status: number) => status !== STATUS_CODE.POST_SUCCESS);
      alert(`${failCount}개의 상품들을 장바구니에서 삭제하는데 실패했습니다!`);
    }
  };

  const setCartItemSelected = (id: CartItem['id'], isSelected: CartItem['isSelected']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], isSelected };
    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const setAllCartItemSelected = (isChecked: boolean) => {
    const newCartItems = cartItems.map(cartItem => ({ ...cartItem, isSelected: !isChecked }));
    setCartItems(newCartItems);
  };

  const setCartItemQuantity = async (id: CartItem['id'], quantity: CartItem['quantity']) => {
    const newCartItems = [...cartItems];
    const targetIndex = newCartItems.findIndex(cartItem => cartItem.id === id);
    const newCartItem = { ...newCartItems[targetIndex], quantity };
    newCartItems.splice(targetIndex, 1, newCartItem);
    setCartItems(newCartItems);
  };

  const getSelectedCartItems = () => {
    return cartItems.filter(item => item.isSelected);
  };

  const totalCartItemPrice = String(
    cartItems.reduce((acc, cartItem) => {
      if (!cartItem.isSelected) {
        return acc;
      }

      return acc + Number(cartItem.price) * Number(cartItem.quantity);
    }, 0)
  );

  const isCartHasProduct = (name: Product['name']) => {
    return cartItems.find(cartItem => cartItem.name === name);
  };

  return {
    cartItems,
    loading,
    error,
    totalCartItemPrice,
    getCartItem,
    setCartItems,
    deleteCartItem,
    deleteAllCartItems,
    isCartHasProduct,
    setCartItemSelected,
    setAllCartItemSelected,
    setCartItemQuantity,
    getSelectedCartItems,
  };
};

export default useCart;
