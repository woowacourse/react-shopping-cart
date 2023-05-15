import { styled } from "styled-components";
import { Header, Page } from "../components";

const Cart = () => {
  return (
    <>
      <Header />
      <Page>
        <TitleBox>장바구니</TitleBox>
        <Container></Container>
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  width: 100%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const Container = styled.section`
  display: flex;
`;

export default Cart;
