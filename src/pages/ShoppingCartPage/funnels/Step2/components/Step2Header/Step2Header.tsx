import { ArrowBackIcon, Header } from "@/components";
import { css } from "@emotion/react";
import { useFunnelContext } from "@/components";

export default function Step2Header() {
  const { goPrevStep } = useFunnelContext();

  return (
    <Header onClick={goPrevStep}>
      <ArrowBackIcon
        css={css`
          width: 24px;
          height: 24px;
          cursor: pointer;
        `}
      />
    </Header>
  );
}
