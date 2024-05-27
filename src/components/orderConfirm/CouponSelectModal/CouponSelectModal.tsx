import { UpsideDownExclamation } from '@assets/index';
import CouponList from '@components/orderConfirm/CouponList/CouponList';
import useCouponSimulator from '@hooks/orderConfirm/useCouponSimulator';
import { Modal } from '@jinyyy/simple-modal';
import { formatKoreanCurrency } from '@utils/currency';

import * as Styled from './CouponSelectModal.styled';

interface CouponSelectModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CouponSelectModalHeaderStyle = { display: 'flex', alignItems: 'center' };
const CouponSelectModalContentStyle = { height: 'auto', padding: '16px 0px' };

const CouponSelectModal: React.FC<CouponSelectModalProps> = ({ isOpen, onToggle }) => {
  const { temporaryTotalDiscountAmount, isActiveCoupon, isCheckedCoupon, onAddTemporarySelectedCoupon, onApplyCoupon } =
    useCouponSimulator();

  return (
    <Modal position="center" isOpen={isOpen} onToggle={onToggle}>
      <Modal.ModalHeader style={CouponSelectModalHeaderStyle} title="쿠폰을 선택해 주세요">
        <Modal.ModalCloseButton onClick={onToggle} />
      </Modal.ModalHeader>
      <Modal.ModalContent style={CouponSelectModalContentStyle}>
        <Styled.Banner>
          <UpsideDownExclamation />
          <Styled.BannerText>쿠폰은 최대 2개까지 사용할 수 있습니다.</Styled.BannerText>
        </Styled.Banner>
        <CouponList
          isActiveCoupon={isActiveCoupon}
          isCheckedCoupon={isCheckedCoupon}
          onAddTemporarySelectedCoupon={onAddTemporarySelectedCoupon}
        />
      </Modal.ModalContent>
      <Modal.ModalFooter direction="row">
        <Modal.ModalButton onClick={() => onApplyCoupon(onToggle)} color="primary">
          {temporaryTotalDiscountAmount === 0
            ? '쿠폰 선택하기'
            : `총 ${formatKoreanCurrency(temporaryTotalDiscountAmount)} 할인 쿠폰 사용하기`}
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default CouponSelectModal;
