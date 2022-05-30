import styled from 'styled-components';
import { Theme } from '../../types';

type StyledUlProps = {
  isDrawerOpened: boolean;
  theme: Theme;
};

export const Nav = styled.nav`
  font-size: 24px;
  font-weight: 500;

  ${({ theme: { media } }) =>
    media.sm(`
      width: auto;
  `)};
`;

export const Button = styled.button`
  display: none;
  color: white;
  background: transparent;

  ${({ theme: { media } }) =>
    media.sm(`
      display: block;
    `)}
`;

export const Ul = styled.ul<StyledUlProps>`
  display: flex;
  flex-direction: row;
  gap: 44px;

  a:hover {
    font-weight: 700;
  }

  ${({ isDrawerOpened, theme: { media, colors } }) =>
    media.sm(`
      width: auto;
      position: absolute;
      width: 100%;
      flex-direction: column;
      background-color: ${colors.emerald};
      top: 80px;
      left: 0;

      display: ${isDrawerOpened ? 'block' : 'none'};
    
      li {
        margin: 20px;
        text-align: right;
  `)};
`;
