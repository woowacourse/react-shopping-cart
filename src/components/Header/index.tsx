import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/shopping-cart.svg';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Styled.Container>
      <Styled.HomeButton>
        <ShoppingCartIcon />
        <Styled.Title>SHOP</Styled.Title>
      </Styled.HomeButton>
      <>{children}</>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    background: #333333;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
    padding: 18px 15%;
  `,

  HomeButton: styled.button`
    display: flex;
    align-items: center;
    gap: 12px;

    background-color: transparent;
  `,

  Title: styled.h1`
    padding-top: 4px;
    letter-spacing: 1px;
    color: #fff;
  `,
};

export default Header;
