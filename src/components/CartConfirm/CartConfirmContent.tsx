import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ApplyCouponButton from './ApplyCouponButton';
import OrderList from './OrderList';
import OrderResult from './OrderResult';
import ShippingCheck from './ShippingCheck';
import Description from '../common/Description';
import Main from '../common/Main';
import Title from '../common/Title';

import FooterButton from '@components/common/FooterButton';
import { productTypesCountState, totalQuantityState } from '@recoil/cartItems/selectors';

export default function CartConfirmContent() {
  const navigate = useNavigate();

  const totalQuantity = useRecoilValue(totalQuantityState);
  const productTypesCount = useRecoilValue(productTypesCountState);

  useEffect(() => {
    if (!totalQuantity) navigate('/');
  }, []);

  return (
    <>
      <Main>
        <section css={confirmContainer}>
          <div css={confirmTitleContainer}>
            <Title>주문 확인</Title>

            <div>
              <Description>
                총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다.
              </Description>
              <Description>최종 결제 금액을 확인해주세요.</Description>
            </div>
          </div>

          <OrderList />
          <ApplyCouponButton />
          <ShippingCheck />

          <OrderResult />
        </section>
      </Main>

      <FooterButton isDisabled={true}>결제하기</FooterButton>
    </>
  );
}

const confirmContainer = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const confirmTitleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 4px;
`;
