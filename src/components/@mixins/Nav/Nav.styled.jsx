import styled, { css } from "styled-components";

const navWrapperStyle = css`
  max-width: 75rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-title {
    display: flex;
    align-items: center;

    h1 {
      font-size: 2.5rem;
      font-weight: 900;
      margin-left: 1rem;
    }
  }
`;

const navMenuStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;

  li:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

export const Nav = styled.nav`
  background-color: #2ac1bc;
  color: white;
  height: 5rem;

  .nav-wrapper {
    ${navWrapperStyle}

    .nav-menu {
      ${navMenuStyle}
    }
  }
`;
