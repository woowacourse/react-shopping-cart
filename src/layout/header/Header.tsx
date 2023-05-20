import styled from 'styled-components';
import { LogoIcon } from '../../assets/ShoppingCartIcon';
import { useNavigate } from 'react-router-dom';
import { CartListLengthViewer } from './CartListLengthViewer';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Style.Container>
      <Style.ContentWrapper>
        <Style.LogoContainer onClick={() => navigate('/')}>
          <LogoIcon />
          <Style.Logo>배민문방구</Style.Logo>
        </Style.LogoContainer>
        <Style.CartContainer>
          <Style.Cart onClick={() => navigate('/cart')}>장바구니</Style.Cart>
          <CartListLengthViewer />
        </Style.CartContainer>
      </Style.ContentWrapper>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

    background-color: #333333;
  `,
  ContentWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1320px;
  `,
  LogoContainer: styled.div`
    display: flex;
    align-items: center;

    gap: 15px;

    cursor: pointer;
  `,
  Logo: styled.h1`
    margin: 0;
    padding: 0;

    font-size: 40px;
    font-weight: 300;

    color: white;
  `,
  CartContainer: styled.div`
    display: flex;
    gap: 10px;

    cursor: pointer;
  `,
  Cart: styled.h1`
    margin: 0;
    padding: 0;

    font-size: 24px;
    font-weight: 300;

    color: white;
  `,
};
