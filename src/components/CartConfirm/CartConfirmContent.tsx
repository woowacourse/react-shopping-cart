import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Description from '../common/Description';
import Title from '../common/Title';

import FooterButton from '@components/common/FooterButton';
import {
  productTypesCountState,
  purchaseTotalPriceState,
  totalQuantityState,
} from '@recoil/cartItems/selectors';

export default function CartConfirmContent() {
  const navigate = useNavigate();
  const totalPurchasePrice = useRecoilValue(purchaseTotalPriceState);
  const totalQuantity = useRecoilValue(totalQuantityState);
  const productTypesCount = useRecoilValue(productTypesCountState);

  useEffect(() => {
    if (!totalQuantity) navigate('/');
  }, []);

  return (
    <>
      <div css={container}>
        <Title>주문 확인</Title>

        <div css={orderInfoContainer}>
          <Description>
            총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다.
          </Description>
          <Description>최종 결제 금액을 확인해주세요.</Description>
        </div>

        <div css={orderResultContainer}>
          <span css={orderResultText}>총 결제 금액</span>
          <span css={orderResult}>{totalPurchasePrice.toLocaleString('ko-KR')}원</span>
        </div>
      </div>
      <FooterButton isDisabled={true}>결제하기</FooterButton>
    </>
  );
}

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;

const orderInfoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 18px;
`;

const orderResultContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const orderResultText = css`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #0a0d13;
`;

const orderResult = css`
  font-size: 24px;
  font-weight: 700;
`;
