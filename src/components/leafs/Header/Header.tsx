import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../../../recoil/state';
import Logo from '../Logo';
import { PATH } from '../../../constants/path';

export default function Header() {
  const cartCount = useRecoilValue(cartCountState);

  const navigate = useNavigate();

  function moveProductListPage() {
    navigate(PATH.PRODUCT_LIST);
  }

  function moveCartListPage() {
    navigate(PATH.CART_LIST);
  }

  return (
    <Wrapper>
      <LogoBox onClick={moveProductListPage}>
        <Logo />
        <LogoTitle>SHOP</LogoTitle>
      </LogoBox>
      <CartBox onClick={moveCartListPage}>
        <Title>장바구니</Title>
        <CartCount>{cartCount}</CartCount>
      </CartBox>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-around;
  gap: 430px;

  width: 100%;
  height: 80px;

  background: ${(props) => props.theme.color.black};

  color: white;

  @media screen and (max-width: 1025px) {
    gap: 280px;
  }

  @media screen and (max-width: 767px) {
    gap: 0px;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  font-size: 40px;
  font-weight: 900;

  cursor: pointer;
`;

const LogoTitle = styled.h1`
  margin-left: 24px;

  vertical-align: center;

  @media screen and (max-width: 767px) {
    visibility: hidden;
  }
`;

const CartBox = styled.div`
  display: flex;

  margin-top: 28px;

  font-size: 24px;
  font-weight: 500;

  cursor: pointer;
`;

const Title = styled.div`
  @media screen and (max-width: 767px) {
  }
`;

const CartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  margin-left: 8px;
  border-radius: 50%;

  background: ${(props) => props.theme.color.green100};

  font-size: 14px;
  font-weight: 700;
`;
