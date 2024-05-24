import { OpenCouponModalButton, OrderItemContainer, RemoteShippingCheckBox } from '..';
import { OrderAmount } from '../../common';
import * as Styled from './OrderContainer.style';

export default function OrderContainer() {
  const handleOpenCouponModal = () => {};

  return (
    <Styled.OrderContainer>
      <OrderItemContainer />

      <OpenCouponModalButton type="button" buttonText="쿠폰 적용" onClick={handleOpenCouponModal} />

      <RemoteShippingCheckBox />

      <OrderAmount pageRoute="confirmOrder" />
    </Styled.OrderContainer>
  );
}
