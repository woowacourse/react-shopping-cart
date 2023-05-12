import styled from "styled-components";
import cartTitleLogo from "../../assets/images/cart-large.png";
import CartNotificationButton from "../CartNotificationButton/CartNotificationButton";

const Header = () => {
  return (
    <Container>
      <CartTitleLogo src={cartTitleLogo} />
      <Title>Shop</Title>
      <CartNotificationButton />
    </Container>
  );
};

const colors = {
  slightLightBlack: "#131313",
  pureWhite: "#fff",
  gold: "#ffdf7e",
};

const Container = styled.header`
  position: fixed;
  display: flex;
  background-color: ${colors.slightLightBlack};
  width: 100%;
  height: 80px;
  align-items: center;
  gap: 31.24px;
  padding: 0 50px;
  z-index: 2;
`;

const CartTitleLogo = styled.img`
  width: 49.98px;
  height: 44px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${colors.pureWhite};
  height: 57px;
  line-height: 57px;
  font-family: "Prata";
  font-weight: 100;
`;

export default Header;
