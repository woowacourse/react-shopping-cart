import { Button, Text } from "@/components";
import { css } from "@emotion/react";
import { ButtonWrapper } from "@/pages/Step1/components/Step1Footer/Step1Footer.styles";
import { useFunnelContext } from "@/components";

export default function Step2Footer() {
  const { goNextStep } = useFunnelContext();

  return (
    <ButtonWrapper>
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
    </ButtonWrapper>
  );
}
