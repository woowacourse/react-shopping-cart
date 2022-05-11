import styled from '@emotion/styled';

const Container = styled.header`
  display: grid;
  height: 4rem;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #ddd;

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
  }

  & > .right-menu {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 1rem;

    > li {
      font-size: 0.9rem;
      padding: 1rem;

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
