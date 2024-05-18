import { formatToWon } from "@/utils/stringHelper";
import styled from "styled-components";

interface PriceInfoBoxProps {
  priceLabel: string;
  price: number;
}

const PriceInfoBox = ({ priceLabel, price }: PriceInfoBoxProps) => {
  return (
    <Wrapper>
      <PriceLabel>{priceLabel}</PriceLabel>
      <Price>{formatToWon(price)}</Price>
    </Wrapper>
  );
};

export default PriceInfoBox;

const Wrapper = styled.div`
  width: 100%;
  height: 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceLabel = styled.span`
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const Price = styled.span`
  height: 34px;
  line-height: 34px;
  font-size: 24px;
  font-weight: 700;
`;
