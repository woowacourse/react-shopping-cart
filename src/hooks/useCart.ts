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

  const isCartHasProduct = (name: Product['name']) => {
    return cartItems.find(cartItem => cartItem.name === name);
  };

  return { cartItems, loading, error, setCartItems, deleteCartItem, deleteAllCartItems, isCartHasProduct };
};

export default useCart;
