import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";
import { COLOR, FONT_SIZE } from "../../../constants/styles";
import { SHOPPING_MESSAGE } from "../../../constants/messages";

const CartEmptyScreen = () => {
  return (
    <CartEmptyScreenContainer>
      <Img src={IMAGES.thunk} />
      <CartEmptyMessage>{SHOPPING_MESSAGE.emptyBasket}</CartEmptyMessage>
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
  color: ${COLOR.grey.dark};
  font-size: ${FONT_SIZE.small};
  text-align: center;
`;

const Img = styled.img`
  margin-top: 20vh;
  width: 30vh;
`;
