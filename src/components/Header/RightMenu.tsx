import { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../types';
import PlainLink from '../PlainLink/PlainLink';

type StyledUlProps = {
  isDrawerOpened: boolean;
  theme: Theme;
};

const menuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

function RightMenu() {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  return (
    <StyledNav>
      <StyledButton onClick={toggleDrawer}>{menuIcon}</StyledButton>
      <StyledUl isDrawerOpened={isDrawerOpened}>
        <li>
          <PlainLink to="/cart">장바구니</PlainLink>
        </li>
        <li>
          <PlainLink to="/orders">주문목록</PlainLink>
        </li>
      </StyledUl>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  font-size: 24px;
  font-weight: 500;

  ${({ theme: { media } }) =>
    media.sm(`
      width: auto;
  `)};
`;

const StyledButton = styled.button`
  display: none;
  color: white;
  background: transparent;

  ${({ theme: { media } }) =>
    media.sm(`
      display: block;
    `)}
`;

const StyledUl = styled.ul<StyledUlProps>`
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

export default RightMenu;
