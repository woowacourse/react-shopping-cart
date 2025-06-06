import { createPortal } from "react-dom";

import { Modal } from "@kaori-killer/modal-component";
import useCoupons from "../../hooks/useCoupons";
import { describe } from "vitest";

interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CouponModal({ isOpen, handleClose }: CouponModalProps) {
  const { state, coupons } = useCoupons();

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="medium">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            쿠폰을 선택해 주세요.
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          {coupons.map((coupon) => (
            <div key={coupon.id}>
              <p>{coupon.description}</p>
              <p>{coupon.expirationDate}</p>
              <p>{coupon.minimumAmount}</p>
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          <button>총 5000원 할인 쿠폰 사용하기</button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CouponModal;
