import { COLOR, SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const AppLayoutContainer = styled.div`
  width: ${SIZE.layoutWidth};
  min-height: 100vh;
  margin: auto;
  background-color: ${COLOR.white};
  -webkit-box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
`;

export const OutletContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: calc(${SIZE.navigationHeight} + 24px) 24px;
  box-sizing: border-box;
  position: relative;
`;
