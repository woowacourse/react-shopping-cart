import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const ErrorPageInner = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomeButton = styled.button`
  background-color: ${COLOR.gray};
  color: ${COLOR.black};
  &:hover {
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }

  border-radius: 20px;
  padding: 14px 16px;
`;
