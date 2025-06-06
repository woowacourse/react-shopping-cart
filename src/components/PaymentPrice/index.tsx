import * as S from "./PaymentPrice.styled";
import Text from "../common/Text";
import GuideSign from "../icons/GuideSign";

interface PaymentPrice {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

export const PaymentPrice = ({ children, direction = "column", gap = 0 }: PaymentPrice) => {
  return (
    <S.PaymentPrice direction={direction} gap={gap}>
      {children}
    </S.PaymentPrice>
  );
};

PaymentPrice.Wrap = ({ children, direction = "column", gap = 0 }: PaymentPrice) => {
  return (
    <S.Wrap direction={direction} gap={gap}>
      {children}
    </S.Wrap>
  );
};

PaymentPrice.LabelWithPrice = ({ label, price }: { label: string; price: number }) => {
  return (
    <S.LabelWithPrice>
      <Text variant="title-2">{label}</Text>
      <Text variant="title-1">{price.toLocaleString()}원</Text>
    </S.LabelWithPrice>
  );
};

PaymentPrice.Description = ({ text }: { text: string }) => {
  return (
    <S.Description>
      <GuideSign />
      <Text variant="body-2">{text}</Text>
    </S.Description>
  );
};

export default PaymentPrice;
