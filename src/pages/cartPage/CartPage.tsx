import * as S from './CartPage.style';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import CartItem from '../../components/features/cartItem/CartItem';
import CartPrice from '../../components/features/cartPrice/CartPrice';
import { getCart } from '../../services/cartService';
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
import useCheckedArray from '../../hooks/useCheckedArray';

const CartPage = () => {
  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
  } = useCartData();
  const { goOrderComplete } = useEasyNavigate();
  const {
    isCheckedArray,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    initIsCheckedArray,
    isAllChecked,
  } = useCheckedArray(cartData);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getCart();
      initCartData(cartData);
      initIsCheckedArray(cartData);
    };

    fetchCartData();
  }, []);

  return (
    <div css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>장바구니</p>

        {cartData.length > 0 ? (
          <>
            <p css={Subtitle}>
              현재 {cartData.length}종류의 상품이 담겨있습니다.
            </p>
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
          <h2>장바구니에 담은 상품이 없습니다</h2>
        )}
      </div>
      <Button
        variant="largeBlack"
        disabled={isCheckedArray.length === 0}
        onClick={() =>
          goOrderComplete(
            cartData.length,
            calculateTotalPrice(getCartItemNamePrice(isCheckedArray, cartData)),
            calculateTotalProductCount(cartData, isCheckedArray)
          )
        }
      >
        주문 확인
      </Button>
    </div>
  );
};

export default CartPage;
