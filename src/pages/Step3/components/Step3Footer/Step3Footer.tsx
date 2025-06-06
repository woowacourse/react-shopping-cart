import { Button, Text, useFunnelContext } from "@/components";
import { css } from "@emotion/react";
import * as S from "./Step3Footer.styles";

export default function Step3Footer() {
  const { goToStep } = useFunnelContext();

  return (
    <S.ButtonWrapper>
      <Button
        css={css`
          width: 100%;
        `}
        onClick={() => goToStep(1)}
      >
        <Text variant="title-3" color="white">
          장바구니로 돌아가기
        </Text>
      </Button>
    </S.ButtonWrapper>
  );
}
