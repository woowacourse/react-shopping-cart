import Styled from "./PriceInfoBox.style";

interface PriceInfoBoxProps {
  priceLabel: string;
  price: number;
}

const PriceInfoBox = ({ priceLabel, price }: PriceInfoBoxProps) => {
  return (
    <Styled.Wrapper>
      <Styled.PriceLabel>{priceLabel}</Styled.PriceLabel>
      <Styled.Price>{price.toLocaleString()}원</Styled.Price>
    </Styled.Wrapper>
  );
};

export default PriceInfoBox;
