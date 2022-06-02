import styled, { css } from 'styled-components';

export const SnackBar = styled.div<{ isSuccess: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 50%;

  transform: translate(-50%);

  min-width: 300px;

  padding: 15px;
  margin-top: 3px;
  border-radius: 4px;

  opacity: 1;
  z-index: 1;

  animation: show-animation 3s ease-in-out forwards;

  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);

  ${({ isSuccess = false, theme }) => css`
    background-color: ${isSuccess ? theme.brandColor_1 : theme.redColor_1};
  `}

  @keyframes show-animation {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const SnackBarMessage = styled.p`
  font-weight: 600;
  text-align: center;
  color: #fff;
  text-decoration: none;
`;
