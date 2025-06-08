/** @jsxImportSource @emotion/react */

import { Modal } from '@sanghee01/modal';
import Button from '../../../shared/ui/Button';
import * as S from './CouponModal.style';
import InfoLabel from '../../../shared/ui/InfoLabel';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position="center" size="medium">
      <Modal.Header title="쿠폰을 선택해 주세요" showCloseButton={true} />
      <Modal.Content>
        <InfoLabel description="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      </Modal.Content>
      <Modal.Footer>
        <Button title={`총 ${6000}원 할인 쿠폰 사용하기`} onClick={onClose} css={S.ButtonCSS} />
      </Modal.Footer>
    </Modal>
  );
};

export default CouponModal;
