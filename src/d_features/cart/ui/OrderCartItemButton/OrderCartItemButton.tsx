// OrderCartItemButton.tsx
import { FooterButton } from '@/f_shared';

import { useOrderCartItem } from '../../model/order';

export const OrderCartItemButton = () => {
  const { disabled, handleOrder } = useOrderCartItem();

  return (
    <FooterButton disabled={disabled} onClick={handleOrder}>
      주문 확인
    </FooterButton>
  );
};
