import styled from "@emotion/styled";

export default function ErrorToast({ errorMessage }: { errorMessage: string }) {
  return <ErrorToastWrapper>{errorMessage}</ErrorToastWrapper>;
}

export const ErrorToastWrapper = styled.div`
  width: 100%;
  height: 45px;
  background-color: #ffc9c9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  position: fixed;
  z-index: 1;

  animation: fadeAnimation 0.5s ease-out;

  @keyframes fadeAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
