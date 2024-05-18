import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import { BACK_ARROW } from '@assets/images';
import FooterButton from '@components/common/FooterButton';
import {
  productTypesCountState,
  purchaseTotalPriceState,
  totalQuantityState,
} from '@recoil/cartItems/selectors';

import Header from '@components/Header';

export default function CartConfirmPage() {
  const navigate = useNavigate();

  const totalPurchasePrice = useRecoilValue(purchaseTotalPriceState);
  const totalQuantity = useRecoilValue(totalQuantityState);
  const productTypesCount = useRecoilValue(productTypesCountState);

  return (
    <>
      <Header>
        <Button id="back-button" css={backButton} onClick={() => navigate(-1)}>
          <img src={BACK_ARROW} alt="back arrow icon" />
        </Button>
      </Header>
      <div css={container}>
        <h2 css={title}>주문 확인</h2>
        <div css={orderInfoContainer}>
          총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해주세요.
        </div>

        <div css={orderResultContainer}>
          <span css={orderResultText}>총 결제 금액</span>
          <span css={orderResult}>{totalPurchasePrice.toLocaleString('ko-KR')}원</span>
        </div>
      </div>
      <FooterButton id="pay-button" isDisabled={true}>
        결제하기
      </FooterButton>
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

const title = css`
  height: 35px;

  font-size: 24px;
  font-weight: 700;
  line-height: 35px;
`;

const orderInfoContainer = css`
  display: flex;
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

const backButton = css`
  padding-left: 24px;

  background-color: inherit;
`;
