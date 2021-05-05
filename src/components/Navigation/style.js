import Styled from 'styled-components';
import PALETTE from '../../constants/palette';

export const NavList = Styled.ul`
  display: flex;
  list-style: none;
  font-size: 1.5rem;

  a {
    text-decoration: none;
    color: ${PALETTE.WHITE};
  }

  li {
    margin-right: 2.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;
