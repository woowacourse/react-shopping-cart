import Button from "../@shared/Button/styles";
import { PaymentContainer, PaymentResultContainer, PaymentTitle } from "./styles";

interface PaymentBoxProps {
  title: string;
  subTitle: string;
  amount: string;
  onClick: () => void;
  buttonName: string;
}

function PaymentBox({ title, subTitle, amount, onClick, buttonName }: PaymentBoxProps) {
  return (
    <PaymentContainer>
      <PaymentTitle>{title}</PaymentTitle>
      <PaymentResultContainer>
        <div>
          <span>{subTitle}</span>
          <span>{amount}원</span>
        </div>
        <Button onClick={onClick}>{buttonName}</Button>
      </PaymentResultContainer>
    </PaymentContainer>
  );
}

export default PaymentBox;
