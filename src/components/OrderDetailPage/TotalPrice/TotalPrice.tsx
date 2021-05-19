import * as Styled from './TotalPrice.styles';

export interface Props {
  title: string;
  priceLabel: string;
  price: string;
}

const TotalPrice = ({ title, priceLabel, price }: Props) => {
  return (
    <Styled.TotalPrice>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Container>
        <Styled.PriceWrapper>
          <Styled.PriceLabel>{priceLabel}</Styled.PriceLabel>
          <Styled.Price>{price}</Styled.Price>
        </Styled.PriceWrapper>
      </Styled.Container>
    </Styled.TotalPrice>
  );
};

export default TotalPrice;
