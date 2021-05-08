import { Props } from './Header';
import styled from 'styled-components';
import { COLORS, SIZE } from '../../constants';

export const Header = styled.div(({ styles }: Props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: SIZE.HEADER_HEIGHT,
  padding: '0 300px',
  backgroundColor: COLORS.MINT_500,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  ...styles,
}));

export const Logo = styled.img`
  margin-right: 23px;
`;

export const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.WHITE};
  font-size: 40px;
  font-weight: 900;
`;

export const LinkButton = styled.button`
  color: ${({ theme }) => theme.WHITE};
  font-size: 24px;
  &:not(:last-child) {
    margin-right: 44px;
  }
`;
