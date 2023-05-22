import styled from "styled-components";
import { useCartInfosSyncer } from "../../hooks/useCartInfosSyncer";

const CartNotificationButton = () => {
  const { cartProductsCount } = useCartInfosSyncer();

  return (
    <Button>
      <Title>장바구니</Title>
      <Count>{cartProductsCount}</Count>
    </Button>
  );
};

const colors = {
  pureWhite: "#fff",
  gold: "#ffdf7e",
  darkGray: "#222",
};

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 140px;
  height: 32px;
  border: none;
  background-color: transparent;
`;

const Title = styled.span`
  display: inline-block;
  width: 100px;
  height: 32px;
  color: ${colors.pureWhite};
  line-height: 32px;
  font-family: "Noto Sans KR";
  font-size: 22px;
`;

const Count = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: ${colors.gold};
  color: ${colors.darkGray};
  font-family: "Rubik";
  font-weight: 800;
  font-size: 16px;
  border-radius: 13px;
`;

export default CartNotificationButton;
