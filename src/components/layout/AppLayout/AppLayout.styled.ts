import { COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  min-height: calc(100vh + ${SIZE.navigationHeight});
  background-color: ${COLOR.lightGray};
`;

export const AppLayoutContainer = styled.div`
  width: ${SIZE.layoutWidth};
  height: 100%;
  margin: auto;
  background-color: ${COLOR.white};
`;

export const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: calc(${SIZE.navigationHeight} + 24px) 24px;
  box-sizing: border-box;
  position: relative;
`;
