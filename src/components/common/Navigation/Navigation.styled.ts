import styled from 'styled-components';
import { COLOR, SIZE } from '@styles/style.constant';

export const Navigation = styled.div`
  width: 430px;
  left: calc((100% - 430px) / 2);
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
