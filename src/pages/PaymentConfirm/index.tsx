import styled from "@emotion/styled";
import Button from "../../components/common/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";

const PaymentConfirm = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LargeText>결제 확인</LargeText>
      <SmallText>
        총 1종류의 상품 2개를 주문했습니다. <br />
        최종 결제 금액을 확인해 주세요.
      </SmallText>
      <MediumText>총 결제 금액</MediumText>
      <LargeText>7,000원</LargeText>

      <Button
        title="장바구니로 돌아가기"
        onClick={() => {
          navigate("/");
        }}
        css={css`
          width: 100%;
          padding: 24px 0;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 0;
        `}
      />
    </Container>
  );
};

export default PaymentConfirm;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const SmallText = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const MediumText = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const LargeText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
