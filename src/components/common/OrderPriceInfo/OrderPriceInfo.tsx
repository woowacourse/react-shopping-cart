import { formatKoreanCurrency } from '@utils/index';
import { ReactNode } from 'react';

import * as Styled from './OrderPriceInfo.styled';

interface PriceInfoRowProps {
  price: number;
  title: string;
  isDiscount?: boolean;
}
const Row = ({ price, title, isDiscount = false }: PriceInfoRowProps) => {
  return (
    <Styled.PriceRow>
      <Styled.PriceLabel>{title}</Styled.PriceLabel>
      <Styled.PriceAmount>
        {price && isDiscount ? '-' : ''}
        {formatKoreanCurrency(price)}
      </Styled.PriceAmount>
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
