import { COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const BottomButton = styled.button`
  width: ${SIZE.layoutWidth};
  height: ${SIZE.bottomButtonHeight};
  position: fixed;
  bottom: 0;
  left: calc((100% - ${SIZE.layoutWidth}) / 2);
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
