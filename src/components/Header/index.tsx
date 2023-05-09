import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/shopping-cart.svg';

const Header = () => {
  return (
    <Styled.Container>
      <Styled.HomeButton>
        <ShoppingCartIcon />
        <Styled.Title>SHOP</Styled.Title>
      </Styled.HomeButton>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    position: absolute;
    width: 1920px;
    height: 80px;
    left: 0px;
    top: 0px;

    background: #333333;

    display: flex;
    justify-content: space-between;
    align-items: center;

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
