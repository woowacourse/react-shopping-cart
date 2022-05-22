import styled, { keyframes } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

const spin = keyframes`
  to { -webkit-transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-top: 3px solid ${({ theme }) => theme.colors['MINT_001']};
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
  -webkit-animation: ${spin} 1s ease-in-out infinite;
`;

function Loading() {
  return (
    <FlexBox direction="column" justifyContent="center" alignItems="center" gap="50px">
      <LoadingSpinner />
      <p>로딩 중입니다.</p>
    </FlexBox>
  );
}
export default Loading;
