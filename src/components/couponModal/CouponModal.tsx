import { Modal } from '@roqkftjs/react-payments-module';
import CloseIcon from '../../assets/CloseIcon.png';
import { Info } from '../common/info/Info';
import { CouponItemList } from '../couponItemList/CouponItemList';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  finalSelectedCouponsState,
  previewSelectedCouponsState,
} from '../../recoil/atoms/atoms';
import { totalDiscountAmountState } from '../../recoil/selector/selector';
export interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [finalSelectedCoupons, setFinalSelectedCoupons] = useRecoilState(
    finalSelectedCouponsState,
  );
  const [previewSelectedCoupons, setPreviewSelectedCoupons] = useRecoilState(
    previewSelectedCouponsState,
  );
  const totalDiscountAmount = useRecoilValue(totalDiscountAmountState);

  if (!isOpen) return null;

  const handleCouponApply = () => {
    setFinalSelectedCoupons(previewSelectedCoupons);
    onClose();
  };

  const handleModalClose = () => {
    if (finalSelectedCoupons.length !== 0) {
      setPreviewSelectedCoupons(finalSelectedCoupons);
    } else {
      setPreviewSelectedCoupons([]);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} position='center' onClose={handleModalClose}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요.</Modal.Title>
        <Modal.IconButton
          src={CloseIcon}
          onClick={handleModalClose}
        ></Modal.IconButton>
      </Modal.Header>
      <Modal.Content>
        <Info message='쿠폰은 최대 2개까지 사용할 수 있습니다.' />
        <CouponItemList />
      </Modal.Content>
      <Modal.Footer>
        <Modal.TextButton
          style={{ fontWeight: 700 }}
          onClick={handleCouponApply}
        >
          총 {totalDiscountAmount.toLocaleString()}원 할인 쿠폰 사용하기
        </Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};
