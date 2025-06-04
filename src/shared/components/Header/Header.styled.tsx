import styled from '@emotion/styled';

import { HeaderProps } from '.';

export const StyledHeader = styled.header<Pick<HeaderProps, 'right'>>`
  position: sticky;
  top: 0;
  height: 64px;
  width: 100%;
  padding: 16px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: ${({ right }) => (right ? 'space-between' : 'flex-start')};
  flex-shrink: 0;
  z-index: 10;
`;
