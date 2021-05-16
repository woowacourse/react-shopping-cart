import styled from "styled-components";
import { MEDIA_QUERY, COLOR } from "../../../constants/style";

export const Nav = styled.nav`
  padding: 0 1rem;
  background-color: ${COLOR.CYAN_400};
  color: ${COLOR.WHITE};
  height: 5rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    height: 3rem;
  }
`;

export const NavWrapper = styled.div`
  max-width: ${MEDIA_QUERY.DESKTOP_WIDE};
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

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    .nav-title {
      svg {
        width: 2rem;
        height: 2rem;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 900;
        margin-left: 1rem;
      }
    }
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    h1 {
      display: none;
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
      background-color: ${COLOR.RED_400};
      text-align: center;
      line-height: 1.8rem;
    }
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    font-size: 1rem;

    li:not(:last-child) {
      margin-right: 1.5rem;
    }

    .cart-link {
      .cart-amount {
        font-size: 0.5rem;
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        line-height: 1rem;
      }
    }
  }
`;
