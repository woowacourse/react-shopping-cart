import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { totalPrice } from '../../../atoms/cartSelects';

export default function TotalPrice() {
  const cartItemsPrice = useRecoilValue(totalPrice);

  return (
    <TotalPriceContainer>
      {cartItemsPrice.toLocaleString()}원
    </TotalPriceContainer>
  );
}

const TotalPriceContainer = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;
