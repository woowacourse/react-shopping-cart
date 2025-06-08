import Text from "../common/Text";
import GuideSign from "../icons/GuideSign";
import * as S from "./Price.styled";

interface Price {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

export const Price = ({ children, direction = "column", gap = 0 }: Price) => {
  return (
    <S.Price direction={direction} gap={gap}>
      {children}
    </S.Price>
  );
};

Price.Wrap = ({ children, direction = "column", gap = 0 }: Price) => {
  return (
    <S.Wrap direction={direction} gap={gap}>
      {children}
    </S.Wrap>
  );
};

Price.WithLabel = ({ label, price }: { label: string; price: number }) => {
  return (
    <S.WithLabel>
      <Text variant="title-2">{label}</Text>
      <Text variant="title-1">{price.toLocaleString()}원</Text>
    </S.WithLabel>
  );
};

Price.Description = ({ text }: { text: string }) => {
  return (
    <S.Description>
      <GuideSign />
      <Text variant="body-2">{text}</Text>
    </S.Description>
  );
};

export default Price;
