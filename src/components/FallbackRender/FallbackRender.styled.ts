import { styled } from 'styled-components';

export const FallbackRender = styled.div`
  position: relative;
  top: 50%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-weight: 600;
`;

export const RetryWrapper = styled.div`
  margin-top: 15px;

  & > button {
    width: 70px;
    height: 40px;

    font-weight: 600;

    border: none;
    border-radius: 10px;

    cursor: pointer;
  }
`;
