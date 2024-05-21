import { Modal } from '@hanuuny/react-modal';
import { InfoIcon } from '../../../assets';

import * as S from './CouponModal.style';

interface CouponModalProps {
  isOpen: boolean;
  close: () => void;
}

function CouponModal({ isOpen, close }: CouponModalProps) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요.</Modal.Title>
        <Modal.CloseButton close={close} />
      </Modal.Header>
      <Modal.Body>
        <S.NotificationContainer>
          <S.InfoIcon src={InfoIcon} />
          <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
        </S.NotificationContainer>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button text="총 6,000원 할인 쿠폰 사용하기" />
      </Modal.Footer>
    </Modal>
  );
}

export default CouponModal;
