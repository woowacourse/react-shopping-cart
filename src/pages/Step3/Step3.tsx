import { ArrowBackIcon, Button, Header, Spacing, Text, useFunnelContext } from "@/components";
import { css } from "@emotion/react";
import * as S from "./Step3.styles";

export default function Step3() {
  const { goPrevStep, goToStep } = useFunnelContext();

  return (
    <>
      <Header onClick={goPrevStep}>
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
          총 {1}종류의 상품 {2}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={24} />
        <Text variant="title-3">총 결제 금액</Text>
        <Spacing size={12} />
        <Text variant="title-1">{3?.toLocaleString()}원</Text>
      </S.OrderCompletedSection>

      <S.ButtonWrapper>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={() => goToStep(1)}
        >
          장바구니로 돌아가기
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
