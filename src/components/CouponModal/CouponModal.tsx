import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import CouponItem from '../CouponItem/CouponItem';
import InfoMessage from '../InfoMessage/InfoMessage';
import Text from '../common/Text/Text';
import { validatedCouponList } from '../../types/coupon';

function CouponModal({
  isOpen,
  onClose,
  validatedCouponList,
  checkedCoupon,
}: {
  isOpen: boolean;
  onClose: () => void;
  validatedCouponList: validatedCouponList[];
  checkedCoupon: number[];
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="쿠폰을 선택해 주세요">
      <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {validatedCouponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          isChecked={checkedCoupon.includes(coupon.id)}
          onCheck={() => {}}
          isDisabled={coupon.isExpired}
        />
      ))}
      <Button color="gray" variant="secondary" onClick={() => {}}>
        <Text varient="body">총 [1,000원] 할인 쿠폰 사용하기</Text>
      </Button>
    </Modal>
  );
}

export default CouponModal;
