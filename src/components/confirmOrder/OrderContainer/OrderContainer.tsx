import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ButtonInterface, Modal } from '@seongjinme/react-modal';

import {
  CouponItemContainer,
  OpenCouponModalButton,
  OrderItemContainer,
  RemoteShippingCheckBox,
} from '..';
import { OrderAmount } from '../../common';
import * as Styled from './OrderContainer.style';

export default function OrderContainer() {
  const [isCouponModalOpened, setIsCouponModalOpened] = useState(false);

  const couponModalTargetElement = document.getElementById('modal') as HTMLElement;
  const couponModalApplyButton: ButtonInterface = {
    text: '총 0000원 할인 쿠폰 사용하기',
    style: 'primary',
    disabled: true,
    onClick: () => {
      handleApplyCoupons();
    },
  };

  const handleOpenCouponModal = () => {
    setIsCouponModalOpened(true);
  };

  const handleApplyCoupons = () => {
    setIsCouponModalOpened(false);
  };

  return (
    <Styled.OrderContainer>
      <OrderItemContainer />

      <OpenCouponModalButton type="button" buttonText="쿠폰 적용" onClick={handleOpenCouponModal} />

      {createPortal(
        <Modal
          isOpen={isCouponModalOpened}
          title="쿠폰을 선택해 주세요"
          width="382px"
          onClose={() => setIsCouponModalOpened(false)}
          buttons={[couponModalApplyButton]}
        >
          <CouponItemContainer />
        </Modal>,
        couponModalTargetElement,
      )}

      <RemoteShippingCheckBox />

      <OrderAmount pageRoute="confirmOrder" />
    </Styled.OrderContainer>
  );
}
