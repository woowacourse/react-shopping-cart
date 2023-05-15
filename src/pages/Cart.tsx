import { styled } from "styled-components";
import { Header, Page, CartProductList } from "../components";

const Cart = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>장바구니</TitleBox>
        <Container>
          <CartProductList />
        </Container>
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const Container = styled.section`
  display: flex;
  padding: 40px 8%;
`;

export default Cart;
