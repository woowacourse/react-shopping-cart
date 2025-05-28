import Text from "../../common/Text";
import GuideSign from "../../icons/GuideSign";
import * as S from "./OrderPrice.styled";

interface OrderPrice {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

export const OrderPrice = ({ children, direction = "row", gap = 0 }: OrderPrice) => {
  return (
    <S.OrderPrice direction={direction} gap={gap}>
      {children}
    </S.OrderPrice>
  );
};

OrderPrice.Wrap = ({ children, direction = "row", gap = 0 }: OrderPrice) => {
  return (
    <S.Wrap direction={direction} gap={gap}>
      {children}
    </S.Wrap>
  );
};

OrderPrice.LabelWithPrice = ({ label, price }: { label: string; price: number }) => {
  return (
    <S.LabelWithPrice>
      <Text variant="title-2">{label}</Text>
      <Text variant="title-1">{price.toLocaleString()}원</Text>
    </S.LabelWithPrice>
  );
};

OrderPrice.Description = ({ text }: { text: string }) => {
  return (
    <S.Description>
      <GuideSign />
      <Text variant="body-2">{text}</Text>
    </S.Description>
  );
};

export default OrderPrice;
