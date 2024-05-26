import styled from '@emotion/styled';
import { theme } from './theme.style';

export const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

export const StyledScrollBox = styled.div`
  margin-top: 64px;
  overflow-y: scroll;
  height: calc(100vh - 300px);
  width: 430px;
`;

export const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  background-color: ${theme.color.white};
  bottom: 0;
`;
