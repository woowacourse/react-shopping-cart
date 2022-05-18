import {
  ExpectedPaymentText,
  ExpectedPaymentWrapper,
} from "./PaymentBox.style";

const ExpectedPaymentBox = ({
  price,
  children,
}: {
  price: number;
  children: React.ReactNode;
}) => {
  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentText>{children}</ExpectedPaymentText>
      <ExpectedPaymentText>{price}원</ExpectedPaymentText>
    </ExpectedPaymentWrapper>
  );
};

export default ExpectedPaymentBox;
