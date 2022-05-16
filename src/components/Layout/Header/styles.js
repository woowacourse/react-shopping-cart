import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

import logo from 'assets/image/logo.png';

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: unset;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;

  &::before {
    content: '\\f0c9';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    padding-right: 0.938rem;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${logo});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
`;

const RightMenu = styled.ul`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1rem;
`;

const RightMenuList = styled.li`
  font-size: 0.9rem;
  padding: 1rem;
  color: ${COLORS.LIGHTEN_50};

  &::before {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    padding-right: 0.625rem;
  }

  &.cart::before {
    content: '\\f07a';
  }

  &.order-list::before {
    content: '\\f007';
  }
`;

const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${COLORS.LIGHTEN_MAX};
  padding: 1.7rem 1.2rem;
  border-bottom: 1px solid ${COLORS.LIGHTEN_150};
`;

export { Container, Logo, LeftMenu, MenuButton, RightMenu, RightMenuList };
