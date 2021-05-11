import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const Nav = styled.nav`
  padding: 0 1rem;
  background-color: ${COLOR.CYAN.PRIMARY};
  color: white;
  height: 5rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const NavWrapper = styled.div`
  max-width: 75rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      padding-bottom: 0.25rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 900;
      margin-left: 1rem;
    }
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;

  li:not(:last-child) {
    margin-right: 2.5rem;
  }

  .cart-link {
    position: relative;

    .cart-amount {
      font-size: 1rem;
      font-weight: 700;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100%;
      position: absolute;
      top: -0.75rem;
      right: -1rem;
      background-color: ${COLOR.RED.PRIMARY};
      text-align: center;
      line-height: 1.8rem;
    }
  }
`;
