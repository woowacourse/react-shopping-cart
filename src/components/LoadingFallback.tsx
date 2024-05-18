import { FlexCenter, FlexColumn } from "@/style/common.style";

import Loading from "@/assets/loading.gif";
import styled from "@emotion/styled";

const LoadingFallBack = () => {
  return (
    <StyledCenterBox>
      <Img src={Loading} alt="loading" />
    </StyledCenterBox>
  );
};

export default LoadingFallBack;

const Img = styled.img`
  width: 20%;
`;

const StyledCenterBox = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  height: 100vh;
`;
