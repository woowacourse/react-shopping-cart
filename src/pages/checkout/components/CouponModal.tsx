import { Modal } from '@jaymyong66/simple-modal';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function CouponModal({ isOpen, handleToggle }: Props) {
  return (
    <Modal position="center" size="medium" isOpen={isOpen} onToggle={handleToggle}>
      <Modal.ModalHeader title="카드사 선택"></Modal.ModalHeader>
      <Modal.ModalContent>
        <div>하위</div>
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <div>바위</div>
      </Modal.ModalFooter>
    </Modal>
  );
}
