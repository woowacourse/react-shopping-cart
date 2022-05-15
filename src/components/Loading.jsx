import styled, { keyframes } from 'styled-components';
import { COLORS } from '../styles/theme';

function Loading() {
  return (
    <StyledLoading className="loading">
      <StyledSpan></StyledSpan>
      <StyledSpan></StyledSpan>
      <StyledSpan></StyledSpan>
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const loading = keyframes`
  0%,100% {
    opacity: 0;      
    transform: scale(0.5);
  }
  50% {
    opacity: 1;          
    transform: scale(1.2);
  }
`;

const StyledSpan = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: ${COLORS.PRIMARY};
  animation: ${loading} 1s 0s linear infinite;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export default Loading;
