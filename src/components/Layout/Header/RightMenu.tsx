import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
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

function RightMenu({ children }: Props) {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  return (
    <StyledNav>
      <button className="hamburger" onClick={toggleDrawer}>
        {menuIcon}
      </button>
      <ul className={isDrawerOpened ? 'drawerOpened' : ''}>
        {Array.isArray(children)
          ? children.map((child: React.ReactNode) => <li>{child}</li>)
          : children}
      </ul>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  font-size: 24px;
  font-weight: 500;

  a:hover {
    font-weight: 700;
  }

  .hamburger {
    display: none;
    color: white;
    background: transparent;
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 44px;
  }

  ${({ theme: { media, colors } }) =>
    media.sm(`
      width: auto;

      .hamburger {
        display: block;
      }

      ul {
        display: none;
        position: absolute;
        width: 100%;
        flex-direction: column;
        background-color: ${colors.emerald};
        
        top: 80px;
        left: 0;
      }

      ul.drawerOpened {
        display: block;
      }

      li {
        margin: 20px;
        text-align: right;
      }
  `)};
`;

export default RightMenu;
