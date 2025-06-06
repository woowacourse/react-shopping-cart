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

export function OrderConfirm() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const selectedCartItemIds = getItem(SELECTED_CART_ITEM_IDS, []);

  const CART_ITEMS_DUMMY = [
    {
      id: 13117,
      quantity: 4,
      product: {
        id: 28,
        name: '아샷추',
        price: 3800,
        imageUrl:
          'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
        category: '식료품',
      },
    },
    {
      id: 13121,
      quantity: 3,
      product: {
        id: 137,
        name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
        price: 5000,
        imageUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
        category: '공백제이',
      },
    },
  ];

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
  };
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
        <SelectedCartProductContainer cartItems={CART_ITEMS_DUMMY} />
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
        <PaymentSummary price={0} CouponDiscountAmount={0} deliveryFee={0} />
      </Main>
      <Footer>
        <Button onClick={() => {}} type="submit" size="full" style="primary">
          결제하기
        </Button>
      </Footer>
    </PageLayout>
  );
}
