import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

import logo from 'assets/logo.png';

const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${COLORS.WHITE};
  padding: 1.7rem 1.2rem;
  border-bottom: 1px solid ${COLORS.ALTO};

  & > .left-menu {
    display: flex;
    align-items: center;

    & > .menu-button {
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
    }
  }

  & > .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${logo});
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
  }

  & > .right-menu {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 1rem;

    > li {
      font-size: 0.9rem;
      padding: 1rem;
      color: ${COLORS.DORADO};

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
    }
  }
`;

export { Container };
