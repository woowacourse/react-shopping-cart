import styled from 'styled-components';
import { COLOR, SIZE } from '@styles/style.constant';

export const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLOR.lightGray};
`;

export const AppLayoutContainer = styled.div`
  width: 430px;
  min-height: 100vh;
  margin: auto;
  background-color: ${COLOR.white};
`;

export const OutletContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${SIZE.navigationHeight});
  padding: 36px 24px;
  box-sizing: border-box;
  position: relative;
`;
