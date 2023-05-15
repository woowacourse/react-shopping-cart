import { styled } from "styled-components";
import FullWidthTitle from "../components/common/FullWidthTitle/FullWidthTitle";

const CartView = () => {
  return (
    <Container>
      <FullWidthTitle>장바구니</FullWidthTitle>
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 15px 0 15px;
  max-width: 1320px;
  height: 600px;
  background-color: #00002210;
  margin: auto;
`;

export default CartView;
