import styled from '@emotion/styled';

export const StyledModalContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 425px;
  height: 50px;
  position: fixed;
  background-color: rgba(253, 169, 169);
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      top: 0;
    }
    100% {
      opacity: 1;
      top: 64px;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      top: 8%;
    }
    100% {
      opacity: 0;
      top: 0;
    }
  }
`;

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0;
`;
