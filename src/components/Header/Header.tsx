import styled from "styled-components";
import cartTitleLogo from "../../assets/images/cart-large.png";
import CartNotificationButton from "../CartNotificationButton/CartNotificationButton";

const Header = () => {
  return (
    <Container>
      <CartTitleLogo src={cartTitleLogo} />
      <Title>SHOP</Title>
      <CartNotificationButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #333333;
  width: 100%;
  height: 80px;
  align-items: center;
  gap: 31.24px;
  padding-left: 300px;
  padding-right: 300px;
`;

const CartTitleLogo = styled.img`
  width: 49.98px;
  height: 44px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #ffffff;
  height: 57px;
  line-height: 57px;
  font-weight: 900;
`;

export default Header;
