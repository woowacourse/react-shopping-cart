import useCouponList from '../../hooks/useCouponList';
import Modal from '../common/Modal/Modal';
import CouponAcceptButton from '../CouponAcceptButton/CouponAcceptButton';
import CouponItem from '../CouponItem/CouponItem';
import InfoMessage from '../InfoMessage/InfoMessage';

function CouponModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { couponList } = useCouponList();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="쿠폰을 선택해 주세요">
      <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {couponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          isChecked={false}
          onCheck={() => {}}
        />
      ))}
      <CouponAcceptButton onClick={() => {}} />
    </Modal>
  );
}

export default CouponModal;
