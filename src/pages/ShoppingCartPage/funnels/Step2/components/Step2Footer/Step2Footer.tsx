import { Button, Text } from "@/components";
import { css } from "@emotion/react";
import * as S_Page from "@/pages/ShoppingCartPage/ShoppingCartPage.styles";
import { useFunnelContext } from "@/modules";

export default function Step2Footer() {
  const { goNextStep } = useFunnelContext();

  return (
    <S_Page.ButtonWrapper>
      <Button
        css={css`
          width: 100%;
        `}
        onClick={goNextStep}
      >
        <Text variant="title-3" color="white">
          결제하기
        </Text>
      </Button>
    </S_Page.ButtonWrapper>
  );
}
