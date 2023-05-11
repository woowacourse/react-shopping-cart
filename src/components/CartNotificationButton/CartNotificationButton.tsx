import styled from "styled-components";

interface CartNotificationButtonProps {
  productCount: number;
}

const CartNotificationButton = ({
  productCount,
}: CartNotificationButtonProps) => {
  return (
    <Button>
      <Title>장바구니</Title>
      <Count>{productCount}</Count>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 140px;
  height: 32px;
  border: none;
  background-color: transparent;
  margin-left: auto;
`;

const Title = styled.span`
  display: inline-block;
  width: 100px;
  height: 32px;
  color: white;
  line-height: 32px;
  font-family: "Noto Sans KR";
  font-size: 22px;
`;

const Count = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: #04c09e;
  color: white;
  font-family: "Noto Sans KR";
  border-radius: 13px;
`;

export default CartNotificationButton;
