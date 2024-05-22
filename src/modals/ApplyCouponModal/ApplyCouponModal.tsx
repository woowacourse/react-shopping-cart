import { Modal } from 'paran-simple-modal';
import * as S from './ApplyCouponModal.style';
import NotificationContainer from '../../components/Container/NotificationContainer/NotificationContainer';
import { useToggleModal } from '../../hooks/useToggleModal';
import { Coupon } from '../../types/Coupon.type';
import CouponList from '../../components/CouponList/CouponList';

interface ApplyCouponModalProps {
  couponList: Coupon[];
}

function ApplyCouponModal({ couponList }: ApplyCouponModalProps) {
  const { openModal } = useToggleModal();
  return (
    <Modal
      style={{ width: '90%', justifyContent: 'space-between', rowGap: '32px' }}
      position="center"
      onBackdropClick={openModal}
    >
      <Modal.CloseButton onClick={openModal}></Modal.CloseButton>
      <Modal.Title title="쿠폰을 선택해 주세요" />
      <S.CouponListContainer>
        <NotificationContainer content={`쿠폰은 최대 2개까지 사용할 수 있습니다.`} />
        <CouponList couponList={couponList}></CouponList>
      </S.CouponListContainer>
      <Modal.ConfirmButton />
    </Modal>
  );
}

export default ApplyCouponModal;
