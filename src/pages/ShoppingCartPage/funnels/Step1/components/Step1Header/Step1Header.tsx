import { Header, Text, useFunnelContext } from "@/components";
import { css } from "@emotion/react";

export default function Step1Header() {
  const { resetStep } = useFunnelContext();

  return (
    <Header>
      <Text
        variant="title-1"
        color="white"
        onClick={resetStep}
        css={css`
          cursor: pointer;
        `}
      >
        SHOP
      </Text>
    </Header>
  );
}
