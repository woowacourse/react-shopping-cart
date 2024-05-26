import { APP_LAYOUT_FIXED_COMPONENT_STYLE, COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const Navigation = styled.div`
  ${APP_LAYOUT_FIXED_COMPONENT_STYLE}
  height: ${SIZE.navigationHeight};
  background-color: ${COLOR.black};
  padding: 16px 24px;
  box-sizing: border-box;
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  position: fixed;
  z-index: 999;
`;
