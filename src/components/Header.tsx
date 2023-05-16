import { styled } from 'styled-components';
import { CartLogo } from '../assets/svg';
import { Link } from 'react-router-dom';
import { CartSize } from './CartSize';

export default function Header() {
  return (
    <Style.Container>
      <Style.Content>
        <Style.Title to="/">
          <CartLogo fill="var(--grey-100)" style={{ width: '40px' }} />
        </Style.Title>
        <Style.CartLink to="/">
          <CartSize />
        </Style.CartLink>
      </Style.Content>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 80px;
    background-color: var(--grey-500);

    color: var(--grey-100);
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1263px;
  `,

  Title: styled(Link)`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 900;

    &::after {
      content: 'SHOP';
      padding-left: 12px;
    }
  `,

  CartLink: styled(Link)`
    display: flex;
    align-items: center;

    font-weight: 500;

    &::before {
      content: '장바구니';
      padding-right: 6px;
    }
  `,
};
