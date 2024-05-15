import { COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLOR.lightGray};
`;

export const AppLayoutContainer = styled.div`
  width: ${SIZE.layoutWidth};
  height: 100vh;
  margin: auto;
  background-color: ${COLOR.white};
`;

export const OutletContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: calc(${SIZE.navigationHeight} + 24px) 24px;
  box-sizing: border-box;
  position: relative;
`;
