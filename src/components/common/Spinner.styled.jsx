import styled from "styled-components";

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Spinner = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;

  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;

  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: ${({ theme }) => theme.color.primary};
  border-bottom-color: ${({ theme }) => theme.color.primary};

  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { SpinnerContainer, Spinner };
