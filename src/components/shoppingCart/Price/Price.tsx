import * as Styled from "./Price.styles";

interface PriceProps {
  name: string;
  price: number;
}

export default function Price({ name, price }: PriceProps) {
  return (
    <Styled.Container>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Price>{price.toLocaleString()}원</Styled.Price>
    </Styled.Container>
  );
}
