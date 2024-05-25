import { APP_LAYOUT_SIZE, COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const AppLayoutContainer = styled.div`
  ${APP_LAYOUT_SIZE};
  min-height: 100vh;
  margin: auto;
  background-color: ${COLOR.white};
  -webkit-box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
`;

export const OutletContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  // 24px: outlet 의 navigation, bottom 같의 padding값
  padding: calc(${SIZE.navigationHeight} + ${SIZE.layoutPadding}) ${SIZE.layoutPadding};
  box-sizing: border-box;
  position: relative;
`;
