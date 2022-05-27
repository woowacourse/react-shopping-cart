import styled, { keyframes } from 'styled-components';
import { flexCenter } from 'styles/mixin';

const Loading = () => {
  return (
    <StyledRoot>
      <StyledLoading />
    </StyledRoot>
  );
};

export default Loading;

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  ${flexCenter};
`;

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: ${Spinner} linear infinite;
  animation-duration: 1s;
`;
