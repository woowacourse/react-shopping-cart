import { styled } from "styled-components";
import { Header, Page, CartProductList, TotalPriceTable } from "../components";

const Cart = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>장바구니</TitleBox>
        <Container>
          <CartProductList />
          <TotalPriceTable />
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
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export default Cart;
