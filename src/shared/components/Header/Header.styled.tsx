import styled from '@emotion/styled';

import { HeaderProps } from '../../../shared/components/Header/Header';

export const StyledHeader = styled.header<Pick<HeaderProps, 'justifyContent'>>`
  position: sticky;
  top: 0;
  height: 64px;
  width: 100%;
  padding: 16px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-shrink: 0;
  z-index: 10;
`;
