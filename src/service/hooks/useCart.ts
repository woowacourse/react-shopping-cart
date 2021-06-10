import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { CART_ITEM_MIN_QUANTITY } from '../../constants/cart';
import { NETWORK_ERROR } from '../../constants/error';
import { cartAction } from '../../states/slices/cart/slice';
import {
  thunkFetchCartItems,
  thunkAddItemToCart,
  thunkDeleteCartItem,
  thunkDeleteCartItems,
} from '../../states/slices/cart/thunk';
import { useAppDispatch, useAppSelector } from '../../states/store';
import { CartId, CartItem, Product } from '../../types';

const useCart = () => {
  const dispatch = useAppDispatch();
  const [
    cartItems,
    hasError,
    isLoading,
    userName,
  ] = useAppSelector(({ cart: { items, error, isLoading }, login: { userName } }) => [
    items,
    error,
    isLoading,
    userName,
  ]);
  const history = useHistory();

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const checkedCartItems = cartItems.filter((item) => item.checked);

  const totalPrice = cartItems.reduce(
    (acc, { price, quantity, checked }) => (checked ? acc + price * quantity : acc),
    0
  );

  const fetchCartItems = () => {
    dispatch(thunkFetchCartItems(userName));
  };

  const addItem = (product: Product) => {
    const cartItem = cartItems.find((CartItem) => CartItem.name === product.name);

    cartItem
      ? dispatch(cartAction.changeItemQuantity({ cartItem, quantity: cartItem.quantity + 1 }))
      : dispatch(thunkAddItemToCart({ userName, product }));

    if (!window.confirm('상품이 담겼습니다. 장바구니로 이동하시겠습니까?')) return;
    history.push('/shoppingCart');
  };

  const deleteItem = (cartId: CartId) => {
    if (!window.confirm('장바구니에서 상품을 삭제하시겠습니까?')) return;
    dispatch(thunkDeleteCartItem({ userName, cartId }));
  };

  const deleteCheckedItems = (items: CartItem[]) => {
    if (!window.confirm('장바구니에서 상품을 삭제하시겠습니까?')) return;

    dispatch(thunkDeleteCartItems({ userName, items }));
  };

  const changeQuantity = (cartItem: CartItem, quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    dispatch(cartAction.changeItemQuantity({ cartItem, quantity }));
  };

  const changeChecked = (cartId: CartId) => {
    dispatch(cartAction.changeItemChecked(cartId));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(cartAction.changeAllItemChecked(checked));
  };

  return {
    fetchCartItems,
    addItem,
    changeQuantity,
    deleteItem,
    deleteCheckedItems,
    changeChecked,
    changeAllChecked,
    cartItems,
    checkedCartItems,
    totalPrice,
    isLoading,
  };
};

export default useCart;
