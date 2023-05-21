import { useRecoilValue } from 'recoil';
import { checkoutPrice } from '../../../atoms/cartSelects';
import styled from 'styled-components';

export default function CheckoutPrice() {
  const checkout = useRecoilValue(checkoutPrice);
  return (
    <CheckoutPriceContainer>
      {checkout.toLocaleString()}원
    </CheckoutPriceContainer>
  );
}

const CheckoutPriceContainer = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;
