import { Button, Text } from "@/components";
import { useShoppingCartContext } from "../../../../contexts";
import { css } from "@emotion/react";
import * as S from "./Step1Footer.styles";
import { useFunnelContext } from "@/modules";

export default function Step1Footer() {
  const { selectedItemIds } = useShoppingCartContext();
  const { goNextStep } = useFunnelContext();

  return (
    <S.ButtonWrapper>
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
    </S.ButtonWrapper>
  );
}
