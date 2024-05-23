import { Modal } from '@roqkftjs/react-payments-module';
import CloseIcon from '../../assets/CloseIcon.png';
import { Info } from '../common/info/Info';
import { CouponItemList } from '../couponItemList/CouponItemList';
export interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} position='center' onClose={onClose}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요.</Modal.Title>
        <Modal.IconButton src={CloseIcon} onClick={onClose}></Modal.IconButton>
      </Modal.Header>
      <Modal.Content>
        <Info message='쿠폰은 최대 2개까지 사용할 수 있습니다.' />
        <CouponItemList />
      </Modal.Content>
      <Modal.Footer>
        <Modal.TextButton style={{ fontWeight: 700 }}>
          총 6,000원 할인 쿠폰 사용하기
        </Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};
