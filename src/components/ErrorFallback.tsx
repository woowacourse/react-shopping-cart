import { FlexCenter, FlexColumn, WhiteSpace } from '@/style/common.style';

import styled from '@emotion/styled';

interface Props {
  error: Error;
}

const ErrorFallback = ({ error }: Props) => {
  return <StyledCenterBox>error : {error.message}</StyledCenterBox>;
};
export default ErrorFallback;

const StyledCenterBox = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  ${WhiteSpace}
  height: 100vh;
`;
