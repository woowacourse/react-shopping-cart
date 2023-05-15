import styled from "styled-components";
import { CartIcon } from "../assets";
import { useRecoilValue } from "recoil";
import { cartProductsSelector } from "../recoil/selector";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "../router";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartProductsSelector);

  const handleTitleClicked = () => {
    navigate(ROUTER_PATH.Main);
  };

  const handleCartClicked = () => {
    navigate(ROUTER_PATH.Cart);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={handleTitleClicked}>
        <img src={CartIcon} alt="홈카트" />
        <p>SHOP</p>
      </TitleContainer>
      <CartContainer onClick={handleCartClicked}>
        장바구니
        {cartItems.length > 0 && (
          <ItemQuantityBox>{cartItems.length}</ItemQuantityBox>
        )}
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

  background: var(--dark-gray);
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

  background: var(--mintish-green);
  border-radius: 50%;

  font-size: 16px;
  font-weight: 500;
  color: white;
`;

export default Header;
