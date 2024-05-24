import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Description from '../common/Description';
import FooterButton from '../common/FooterButton';
import Main from '../common/Main';
import Title from '../common/Title';

import LocalStorage, { CART_ITEM } from '@/Storage';
import { cartItemsState } from '@recoil/cartItems/atoms';
import {
  productTypesCountState,
  purchaseTotalPriceState,
  totalQuantityState,
} from '@recoil/cartItems/selectors';
import { fixedSelectedCouponsState } from '@recoil/coupon/atom';
import { orderItemsIdSelector } from '@recoil/order/selector';

export default function PaymentConfirm() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const cartItemIds = useRecoilValue(orderItemsIdSelector);
  const totalQuantity = useRecoilValue(totalQuantityState);
  const productTypesCount = useRecoilValue(productTypesCountState);
  const totalPrice = useRecoilValue(purchaseTotalPriceState);
  const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);

  const onFooterButtonClickHandler = () => {
    setFixedSelectedCoupons([]);
    setCartItems(cartItems.filter(({ id }) => !cartItemIds.includes(id)));
    cartItemIds.forEach((cartItemId) => LocalStorage.deleteData(CART_ITEM, cartItemId));

    navigate('/');
  };

  return (
    <>
      <Main>
        <section css={paymentConfirmContainer}>
          <Title>결제 확인</Title>

          <div css={descriptionWrapper}>
            <Description>
              총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문했습니다.
            </Description>
            <Description>최종 결제 금액을 확인해주세요.</Description>
          </div>

          <div css={totalPriceWrapper}>
            <h2 css={totalPriceTitle}>총 결제 금액</h2>
            <span css={totalPriceText}>{totalPrice.toLocaleString('ko-KR')}원</span>
          </div>
        </section>
      </Main>
      <FooterButton onClick={onFooterButtonClickHandler} isDisabled={false}>
        장바구니로 돌아가기
      </FooterButton>
    </>
  );
}

const paymentConfirmContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const descriptionWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const totalPriceWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const totalPriceTitle = css`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: #0a0d13;
`;

const totalPriceText = css`
  height: 35px;

  font-size: 24px;
  font-weight: 700;
`;
