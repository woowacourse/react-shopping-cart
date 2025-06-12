import Modal from "compoents-modal-test-kangoll";
import Button from "../../../components/Button/Button";

interface CouponModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  discountedPrice: number;
  children: React.ReactNode;
}

export function CouponModal({
  isModalOpen,
  handleModalClose,
  discountedPrice,
  children,
}: CouponModalProps) {
  return (
    <Modal
      position="center"
      isOpen={isModalOpen}
      onClose={handleModalClose}
      size="sm"
      backdropClosable
    >
      <Modal.Header hasCloseButton>쿠폰을 선택해주세요</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <Button onClick={handleModalClose} size="full">
          총 {discountedPrice.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
