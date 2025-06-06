import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Main from '../../components/layout/Main/Main';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import {
  backButton,
  backImg,
  titleBox,
  subTitleStyle,
  titleStyle,
  subTitleBox,
  applyButton,
  checkBoxWrapper,
  labelText,
  deliveryText,
} from './OrderConfirm.style';
import Button from '../../components/Common/Button/Button';
import { getItem, SELECTED_CART_ITEM_IDS } from '../../utils/localStorage';
import { Footer } from '../../components/layout/Footer/Footer';
import { SelectedCartProductContainer } from '../../components/CartItem/SelectedCartProductContainer/SelectedCartProductContainer';
import { CheckBox } from '../../components/Common/CheckBox/CheckBox';
import { useState } from 'react';
import { PaymentSummary } from '../../components/Payment/PaymentSummary/PaymentSummary';
import { useCartItemsContext } from '../../components/Common/CartItemsProvider/CartItemsProvider';
import { getCartItemSummary } from '../../utils/getCartItemSummary';

export function OrderConfirm() {
  const { cartItems } = useCartItemsContext();

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const selectedCartItemIds = getItem(SELECTED_CART_ITEM_IDS, []);

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const { totalPrice } = getCartItemSummary(
    cartItems,
    selectedCartItemIds.map(String)
  );

  return (
    <PageLayout>
      <Header>
        <button css={backButton} onClick={handleBackClick}>
          <img css={backImg} src="./back.png" />
        </button>
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>주문 확인</p>
          <div css={subTitleBox}>
            <p css={subTitleStyle}>
              현재 {selectedCartItemIds.length}종류의 상품 {}개를 주문합니다.
            </p>
            <p css={subTitleStyle}>최종 결제 금액을 확인해 주세요.</p>
          </div>
        </div>
        <SelectedCartProductContainer cartItems={cartItems} />
        <button css={applyButton} onClick={() => {}}>
          쿠폰 적용
        </button>
        <div>
          <p css={deliveryText}>배송 정보</p>
          <div css={checkBoxWrapper}>
            <CheckBox
              id="mountainousArea"
              isChecked={isChecked}
              onChange={handleCheckBoxChange}
              dataTestId="mountainousArea"
            />
            <label htmlFor="mountainousArea" css={labelText}>
              제주도 및 도서 산간 지역
            </label>
          </div>
        </div>
        <PaymentSummary
          price={totalPrice}
          CouponDiscountAmount={0}
          deliveryFee={0}
        />
      </Main>
      <Footer>
        <Button onClick={() => {}} type="submit" size="full" style="primary">
          결제하기
        </Button>
      </Footer>
    </PageLayout>
  );
}
