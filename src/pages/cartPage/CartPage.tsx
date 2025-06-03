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
import {
  NO_ITEM_IN_CART,
  CART_ITEM_TYPE_COUNT,
} from '../../constants/systemMessages';
import tryApiCall from '../../utils/tryApiCall';
import { useToast } from '../../contexts/ToastContext';

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
    isAllChecked,
  } = useCheckedArray(cartData);
  const { openToast } = useToast();

  useEffect(() => {
    const fetchCartData = async () => {
      const { error } = await tryApiCall(async () => {
        const fetchedCartItems = await getCart();
        initCartData(fetchedCartItems);
        return fetchedCartItems;
      });

      if (error) {
        openToast(error, false);
      } else {
        openToast('장바구니 데이터를 불러왔습니다.', true);
      }
    };

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
