import { Modal } from 'paran-simple-modal';
import * as S from './ApplyCouponModal.style';
import NotificationContainer from '../../components/Container/NotificationContainer/NotificationContainer';
import { useToggleModal } from '../../hooks/useToggleModal';
import { Coupon } from '../../types/Coupon.type';
import CouponList from '../../components/List/CouponList/CouponList';
import { useCalculateTotalCouponDiscount } from '../../hooks/useCalculateTotalCouponDiscount';

interface ApplyCouponModalProps {
  couponList: Coupon[];
}

function ApplyCouponModal({ couponList }: ApplyCouponModalProps) {
  const { openModal } = useToggleModal();
  const { selectedCouponTotalDiscount } = useCalculateTotalCouponDiscount();
  return (
    <Modal
      style={{ width: '90%', justifyContent: 'space-between', rowGap: '16px' }}
      position="center"
      onBackdropClick={openModal}
    >
      <Modal.CloseButton onClick={openModal} style={{ top: '34px', right: '20px' }} />
      <Modal.Title title="쿠폰을 선택해 주세요" style={{ marginTop: '14px' }} />
      <S.CouponListContainer>
        <NotificationContainer content={`쿠폰은 최대 2개까지 사용할 수 있습니다.`} />
        <CouponList couponList={couponList} />
      </S.CouponListContainer>
      {selectedCouponTotalDiscount === 0 ? (
        <Modal.CancelButton content={`선택된 쿠폰이 없습니다`} onClick={openModal} />
      ) : (
        <Modal.ConfirmButton
          content={`총 ${selectedCouponTotalDiscount.toLocaleString()}원 할인 쿠폰 사용하기`}
          onClick={openModal}
        />
      )}
    </Modal>
  );
}

export default ApplyCouponModal;
