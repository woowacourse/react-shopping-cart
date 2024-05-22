import { formatKoreanCurrency } from '@utils/index';
import { ReactNode } from 'react';

import * as Styled from './OrderPriceInfo.styled';

interface PriceInfoRowProps {
  price: number;
  title: string;
}
const Row = ({ price, title }: PriceInfoRowProps) => {
  return (
    <Styled.PriceRow>
      <Styled.PriceLabel>{title}</Styled.PriceLabel>
      <Styled.PriceAmount>{formatKoreanCurrency(price)}</Styled.PriceAmount>
    </Styled.PriceRow>
  );
};

const PriceInfo = ({ children }: { children: ReactNode }) => {
  return (
    <Styled.OrderPrice>
      <Styled.PriceGroup>{children}</Styled.PriceGroup>
    </Styled.OrderPrice>
  );
};

const OrderPriceInfo = Object.assign(PriceInfo, {
  Row: Row,
});

export default OrderPriceInfo;
