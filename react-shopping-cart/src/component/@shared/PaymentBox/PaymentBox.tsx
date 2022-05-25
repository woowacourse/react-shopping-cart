import { PaymentText, PaymentWrapper } from "./PaymentBox.style";

const PaymentBox = ({
  price,
  children,
}: {
  price: number;
  children: React.ReactNode;
}) => {
  return (
    <PaymentWrapper>
      <PaymentText>{children}</PaymentText>
      <PaymentText>{price}원</PaymentText>
    </PaymentWrapper>
  );
};

export default PaymentBox;
