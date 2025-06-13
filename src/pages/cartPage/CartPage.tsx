import * as S from './CartPage.style';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import CartItem from '../../components/features/cartItem/CartItem';
import CartPrice from '../../components/features/cartPrice/CartPrice';
import { useEffect } from 'react';
import Checkbox from '../../components/@common/checkbox/Checkbox';
import Button from '../../components/@common/button/Button';
import useEasyNavigate from '../../hooks/useEasyNavigate';
import {
  calculateTotalPrice,
  calculateTotalProductCount,
  getCartItemNamePrice,
} from '../../utils/calculate';
import useCartData from '../../hooks/useCartData';
import useCheckedArray from '../../hooks/useCheckedCartArray';
import {
  NO_ITEM_IN_CART,
  CART_ITEM_TYPE_COUNT,
} from '../../constants/systemMessages';

const CartPage = () => {
  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    fetchCartData,
  } = useCartData();
  const { goOrderComplete } = useEasyNavigate();
  const {
    isCheckedArray,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    isAllChecked,
  } = useCheckedArray(cartData);

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>장바구니</p>

        {cartData.length > 0 ? (
          <>
            <p css={Subtitle}>{CART_ITEM_TYPE_COUNT(cartData)}</p>
            <div css={S.CartCheckboxContainer}>
              <Checkbox
                checked={isAllChecked}
                onChange={() => controlAllCheckBox(cartData)}
              />
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
            <CartPrice
              cartItemNamePrice={getCartItemNamePrice(isCheckedArray, cartData)}
            />
          </>
        ) : (
          <h2>{NO_ITEM_IN_CART}</h2>
        )}
      </div>
      <Button
        variant="largeBlack"
        disabled={isCheckedArray.length === 0}
        onClick={() => {
          const selectedItems = cartData.filter((item) =>
            isCheckedArray.includes(item.id)
          );
          goOrderComplete(
            selectedItems.length,
            calculateTotalPrice(getCartItemNamePrice(isCheckedArray, cartData)),
            calculateTotalProductCount(cartData, isCheckedArray),
            selectedItems
          );
        }}
      >
        주문 확인
      </Button>
    </div>
  );
};

export default CartPage;
