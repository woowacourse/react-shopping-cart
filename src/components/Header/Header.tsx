import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/stussy-logo.svg';
import { WIDTH } from '../../styles/mediaQuery';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Container>
      <Link to='/'>
        <HomeButton>
          <ShoppingCartIconContainer>
            <ShoppingCartIcon width='100%' />
          </ShoppingCartIconContainer>
        </HomeButton>
      </Link>
      <Link to='/cart'>{children}</Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;

  margin: 0;
  padding: 18px 15%;

  background: #333333;

  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.MD}) {
    padding: 8px 12%;

    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 16px;
    }
  }
`;

const HomeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  background-color: transparent;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    gap: 4px;
  }
`;

const ShoppingCartIconContainer = styled.div`
  padding-top: 10px;
  width: 60px;
  fill: #fff;

  @media (max-width: ${WIDTH.MD}) {
    width: 45px;
  }
`;

export default Header;
