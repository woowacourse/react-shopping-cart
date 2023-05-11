import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/logo.svg';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Styled.Container>
      <Link to='/'>
        <Styled.HomeButton>
          <ShoppingCartIcon />
          <Styled.Title>SHOP</Styled.Title>
        </Styled.HomeButton>
      </Link>
      <>{children}</>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
    padding: 18px 15%;

    background: #333333;
  `,

  HomeButton: styled.button`
    display: flex;
    align-items: center;
    gap: 12px;

    background-color: transparent;

    cursor: pointer;
  `,

  Title: styled.h1`
    padding-top: 4px;
    letter-spacing: 1px;
    color: #fff;
  `,
};

export default Header;
