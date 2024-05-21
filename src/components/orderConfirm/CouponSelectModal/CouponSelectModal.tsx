import { UpsideDownExclamation } from '@assets/index';
import CouponList from '@components/orderConfirm/CouponList/CouponList';
import { Modal } from '@jinyyy/simple-modal';

import * as Styled from './CouponSelectModal.styled';

interface CouponSelectModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CouponSelectModal: React.FC<CouponSelectModalProps> = ({ isOpen, onToggle }) => {
  return (
    <Modal position="center" isOpen={isOpen} onToggle={onToggle}>
      <Modal.ModalHeader style={{ display: 'flex', alignItems: 'center' }} title="쿠폰을 선택해 주세요">
        <Modal.ModalCloseButton onClick={onToggle} />
      </Modal.ModalHeader>
      <Modal.ModalContent style={{ height: 'auto', padding: '16px 0px' }}>
        <Styled.Banner>
          <UpsideDownExclamation />
          <Styled.BannerText>쿠폰은 최대 2개까지 사용할 수 있습니다.</Styled.BannerText>
        </Styled.Banner>
        <>
          <CouponList />
        </>
      </Modal.ModalContent>
      <Modal.ModalFooter direction="row">
        <Modal.ModalButton onClick={onToggle} color="primary">
          총 6,000원 할인 쿠폰 사용하기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default CouponSelectModal;
