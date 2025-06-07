import { Modal, useModal } from "@sinjuk1/modal";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import notice from "/notice.svg";

import * as Styled from "./ApplyCoupon.style";

const COUPON_RULE = {
  maxCoupons: 2,
} as const;

function ApplyCoupon() {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div>
      <ApplyCouponButton onClick={handleOpenModal} />
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Container position="center" size="small">
          <Modal.Title title="쿠폰을 선택해 주세요" />
          <Modal.CloseButton />

          <Styled.Notice>
            <Styled.NoticeIcon src={notice} />
            <Styled.Text>
              쿠폰은 최대 {COUPON_RULE.maxCoupons}개까지 사용할 수 있습니다.
            </Styled.Text>
          </Styled.Notice>
        </Modal.Container>
      </Modal>
    </div>
  );
}

export default ApplyCoupon;
