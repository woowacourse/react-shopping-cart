import * as S from './CartPage.style';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import CartItem from '../../components/features/cartItem/CartItem';
import CartPrice from '../../components/features/cartPrice/CartPrice';
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from '../../services/cartService';
import { useEffect, useState } from 'react';
import Checkbox from '../../components/@common/checkbox/Checkbox';
import type { CartItemType } from '../../types/response';

const CartPage = () => {
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const [isCheckedArray, setIsCheckedArray] = useState<number[]>([]);

  const isAllChecked = isCheckedArray.length === cartData.length;

  const justifyIsChecked = (cartId: number) => {
    const isChecked = isCheckedArray.includes(cartId);
    return isChecked;
  };

  const controlCheckBox = (cartId: number) => {
    if (justifyIsChecked(cartId)) {
      setIsCheckedArray(isCheckedArray.filter((id) => id !== cartId));
      return;
    }

    setIsCheckedArray([...isCheckedArray, cartId]);
  };

  const controlAllCheckBox = () => {
    if (isAllChecked) {
      setIsCheckedArray([]);
      return;
    }
    setIsCheckedArray(cartData.map((item) => item.id));
  };

  const updateCartItem = async (cartId: number) => {
    const cartItem = cartData.find((item) => item.id === cartId);
    if (!cartItem) {
      return;
    }
    if (cartItem.quantity === 1) {
      await removeCartItem(cartItem.id);
      return;
    }
    await increaseCartItem(cartItem.id, cartItem.quantity - 1);
  };

  const increaseCartItem = async (cartItemId: number, quantity: number) => {
    await modifyCartItem(cartItemId, quantity);
    const cartData = await getCart();
    setCartData(cartData);
  };

  const removeCartItem = async (cartItemId: number) => {
    await deleteCartItem(cartItemId);
    const cartData = await getCart();
    setCartData(cartData);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCart();
      setCartData(cartData);
    };

    fetchCartData();
  }, []);

  return (
    <div css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>장바구니</p>
        <p css={Subtitle}>현재 {cartData.length}종류의 상품이 담겨있습니다.</p>
      </div>
      <div css={S.CartCheckboxContainer}>
        <Checkbox checked={isAllChecked} onChange={controlAllCheckBox} />
        <p>전체 선택</p>
      </div>
      {cartData.map((item) => (
        <CartItem
          key={item.id}
          cartData={item}
          updateCartItem={updateCartItem}
          increaseCartItem={increaseCartItem}
          justifyIsChecked={justifyIsChecked}
          controlCheckBox={controlCheckBox}
          removeCartItem={removeCartItem}
        />
      ))}
      <CartPrice />
    </div>
  );
};

export default CartPage;
