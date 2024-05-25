import { APP_LAYOUT_FIXED_COMPONENT_STYLE, COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const BottomButton = styled.button`
  ${APP_LAYOUT_FIXED_COMPONENT_STYLE};
  height: ${SIZE.bottomButtonHeight};
  position: fixed;
  bottom: 0;
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
