import { ArrowBackIcon, Button, Header, Spacing, Text } from "@/components";
import { useLocation, useNavigate } from "react-router";
import * as S from "./OrderCompletedPage.styles";
import { css } from "@emotion/react";

export default function OrderCompletedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const onTitleClick = () => {
    navigate("/");
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
        <Text variant="title-1">주문 확인</Text>
        <Spacing size={27} />
        <Text variant="body-3">
          총 {location.state.kind}종류의 상품 {location.state.quantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={24} />
        <Text variant="title-3">총 결제 금액</Text>
        <Spacing size={12} />
        <Text variant="title-1">{location.state.totalPrice.toLocaleString()}원</Text>
      </S.OrderCompletedSection>

      <S.ButtonWrapper>
        <Button
          css={css`
            width: 100%;
            background-color: rgba(0, 0, 0, 0.1);
          `}
        >
          결제하기
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
