import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const BottomButton = styled.button`
  width: 430px;
  height: 64px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    background-color: ${COLOR.disableButtonColor};
    color: ${COLOR.white};
  }
`;
