import { Button, Text } from "@/components";
import { css } from "@emotion/react";
import * as S_Page from "@/pages/ShoppingCartPage/ShoppingCartPage.styles";
import { useFunnelContext } from "@/modules";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";

export default function Step1Footer() {
  const { selectedItemIds } = useShoppingCartContext();
  const { goNextStep } = useFunnelContext();

  return (
    <S_Page.ButtonWrapper>
      <Button
        css={css`
          width: 100%;
        `}
        onClick={goNextStep}
        disabled={selectedItemIds.length === 0}
      >
        <Text variant="title-3" color="white">
          주문 확인
        </Text>
      </Button>
    </S_Page.ButtonWrapper>
  );
}
