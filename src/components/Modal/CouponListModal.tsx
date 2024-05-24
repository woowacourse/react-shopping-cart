import { Modal } from '@pakxe/react-simple-modal';
import NoticeMessage from '../NoticeMessage/NoticeMessage';
import { MAX_COUPON_COUNT } from '../../constants/coupon';

type CouponListModalProps = {
  isOpen: boolean;
  close: () => void;
};

const CouponListModal = ({ isOpen, close }: CouponListModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <Modal.CloseButton close={close} />
      </Modal.Header>
      <Modal.Body>
        <NoticeMessage message={`쿠폰은 최대 ${MAX_COUPON_COUNT}개까지 사용할 수 있습니다.`} />
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button text="총 {?}원 할인 쿠폰 사용하기" fullWidth variants="normal" color="default" />
      </Modal.Footer>
    </Modal>
  );
};

export default CouponListModal;
