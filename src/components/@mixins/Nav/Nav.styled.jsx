import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLOR } from "../../../constants/style";
import SCREENS from "../../../constants/screens";

export const Nav = styled.nav`
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
  max-width: ${SCREENS.BREAKPOINTS.LARGE};
  height: 100%;
  margin: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    margin: 0 1rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.MEDIUM}) {
    margin: 0 2rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.LARGE}) {
    margin: 0 auto;
  }
`;

export const TitleLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 900;
  margin-left: 1rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    font-size: 2.5rem;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;

  @media (min-width: ${SCREENS.BREAKPOINTS.MEDIUM}) {
    column-gap: 2.5rem;
  }
`;

export const ListItem = styled.li`
  display: flex;

  &:not(:first-child) {
    margin-left: 2rem;
  }
`;

export const CartLink = styled(Link)`
  position: relative;
`;

export const LinkName = styled.span`
  display: none;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    display: inline;
  }
`;

export const SmallLinkName = styled.span`
  display: inline;
  width: 2rem;
  fill: white;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    display: none;
  }
`;

export const CartQuantity = styled.span`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  position: absolute;
  top: -0.75rem;
  right: -1rem;
  background-color: ${COLOR.RED.PRIMARY};
  align-items: center;
  justify-content: center;
`;
