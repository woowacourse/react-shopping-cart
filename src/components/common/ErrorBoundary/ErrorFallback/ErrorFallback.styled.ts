import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const ErrorFallbackWrapper = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorFallbackTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const ErrorFallbackButton = styled.button`
  border: 1px solid black;
  width: 100px;
  height: 32px;
  border-radius: 4px;
  background-color: ${COLOR.black};
  color: ${COLOR.white};

  &:hover {
    background-color: ${COLOR.lightGray};
    color: ${COLOR.black};
  }
`;
