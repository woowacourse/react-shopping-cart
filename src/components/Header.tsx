import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ROUTER_PATH } from "router";
import { cartListState } from "recoil/cart";

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartListState).length;

  const goToMain = () => {
    navigate(ROUTER_PATH.Main);
  };

  const goToCart = () => {
    navigate(ROUTER_PATH.Cart);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={goToMain}>
        <img src={process.env.PUBLIC_URL + "/assets/cart-icon.svg"} alt="홈카트" />
        <p>SHOP</p>
      </TitleContainer>
      <CartContainer onClick={goToCart}>
        장바구니
        {cartCount > 0 && <ItemQuantityBox>{cartCount}</ItemQuantityBox>}
      </CartContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;

  width: 100%;
  min-height: 70px;
  padding: 0 10%;

  background: #333333;
`;

const TitleContainer = styled.section`
  display: flex;
  align-items: end;
  gap: 20px;

  cursor: pointer;

  & > p {
    color: white;
    font-weight: 900;
    font-size: 2rem;
  }

  & > img {
    width: 46px;
    height: 46px;
  }
`;

const CartContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 24px;
  font-weight: 500;
  color: white;

  cursor: pointer;
`;

const ItemQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 50%;

  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export default Header;
