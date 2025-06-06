import { createPortal } from "react-dom";

import { Modal } from "@kaori-killer/modal-component";

interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CouponModal({ isOpen, handleClose }: CouponModalProps) {
  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="medium">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            쿠폰을 선택해 주세요.
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>안녕</Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          안뇽뇽
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CouponModal;
