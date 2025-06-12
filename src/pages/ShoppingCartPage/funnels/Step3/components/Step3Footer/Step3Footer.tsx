import { Button, Text } from "@/components";
import { css } from "@emotion/react";
import * as S_Page from "@/pages/ShoppingCartPage/ShoppingCartPage.styles";
import { useFunnelContext } from "@/modules";

export default function Step3Footer() {
  const { resetStep } = useFunnelContext();

  return (
    <S_Page.ButtonWrapper>
      <Button
        css={css`
          width: 100%;
        `}
        onClick={resetStep}
      >
        <Text variant="title-3" color="white">
          장바구니로 돌아가기
        </Text>
      </Button>
    </S_Page.ButtonWrapper>
  );
}
