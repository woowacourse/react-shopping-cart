import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { deliveryFee } from '../../../atoms/cartSelects';

export default function DeliveryPrice() {
  const deliveryPrice = useRecoilValue(deliveryFee);

  return (
    <DeliveryPriceContainer>
      {deliveryPrice.toLocaleString()}원
    </DeliveryPriceContainer>
  );
}

const DeliveryPriceContainer = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;
