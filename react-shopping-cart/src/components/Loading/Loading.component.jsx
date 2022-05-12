import styled, { keyframes } from 'styled-components';

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const spin = keyframes`
  to { -webkit-transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-top: 3px solid ${({ theme }) => theme.usingColor.loadingSpinner};
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
  -webkit-animation: ${spin} 1s ease-in-out infinite;
`;

function Loading(props) {
  return (
    <LoadingBox>
      <LoadingSpinner />
      <p>로딩 중입니다.</p>
    </LoadingBox>
  );
}
export default Loading;
