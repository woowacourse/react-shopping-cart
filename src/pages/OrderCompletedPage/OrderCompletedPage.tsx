import { ArrowBackIcon, Button, Header, Spacing, Text } from "@/components";
import { useLocation, useNavigate } from "react-router";
import * as S from "./OrderCompletedPage.styles";
import { css } from "@emotion/react";
import { PATH } from "@/constants";

export default function OrderCompletedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { kind, quantity, totalPrice } = location?.state || {};

  const onTitleClick = () => {
    navigate(-1);
  };

  const onBackToShoppingCartClick = () => {
    navigate(PATH.shoppingCart);
  };

  return (
    <>
      <Header onClick={onTitleClick}>
        <ArrowBackIcon
          css={css`
            width: 24px;
            height: 24px;
            cursor: pointer;
          `}
        />
      </Header>

      <S.OrderCompletedSection>
        <Text variant="title-1">결제 확인</Text>
        <Spacing size={27} />
        <Text variant="body-3">
          총 {kind}종류의 상품 {quantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={24} />
        <Text variant="title-3">총 결제 금액</Text>
        <Spacing size={12} />
        <Text variant="title-1">{totalPrice?.toLocaleString()}원</Text>
      </S.OrderCompletedSection>

      <S.ButtonWrapper>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={onBackToShoppingCartClick}
        >
          장바구니로 돌아가기
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
