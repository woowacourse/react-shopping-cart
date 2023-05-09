import styled from "styled-components";
import cartTitleLogo from "../../assets/images/cart-large.png";

const Header = () => {
  return (
    <Container>
      <CartTitleLogo />
      <Title>SHOP</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  height: 80px;
  align-items: center;
  gap: 31.24px;
  padding-left: 300px;
`;

const CartTitleLogo = styled.img.attrs({
  src: cartTitleLogo,
})`
  width: 49.98px;
  height: 44px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: white;
  height: 57px;
  line-height: 57px;
  font-weight: 900;
`;

export default Header;
