import * as S from "./confirm.styles";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../../components/common/Button";
import { css } from "@emotion/react";
import { useLocation } from "react-router";

const Confirm = () => {
  const location = useLocation();
  const { sort, totalAmount, totalPrice } = location.state;
  return (
    <>
      <S.Container data-testid="order-confirm-description">
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {sort}종류의 상품 {totalAmount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceSection>
          <S.PriceSection>총 결제 금액</S.PriceSection>
          <S.Price>{formatPrice(totalPrice)}</S.Price>
        </S.PriceSection>
      </S.Container>

      <Button
        title="결제하기"
        onClick={() => {}}
        css={css`
          width: 100%;
          padding: 24px 0;
          background-color: #bebebe;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 0;
        `}
      />
    </>
  );
};

export default Confirm;
