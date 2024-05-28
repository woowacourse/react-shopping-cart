import styled from "styled-components";
import IMAGES from "../../assets/images/Images";

const CartEmptyScreen = () => {
  return (
    <CartEmptyScreenContainer>
      <Img src={IMAGES.thunk} />
      <CartEmptyMessage>장바구니가 비었어요 ㅠㅠ</CartEmptyMessage>
    </CartEmptyScreenContainer>
  );
};

export default CartEmptyScreen;

const CartEmptyScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CartEmptyMessage = styled.p`
  color: rgb(150, 150, 150);
  font-size: 11px;
  text-align: center;
`;

const Img = styled.img`
  margin-top: 20vh;
  width: 30vh;
`;
