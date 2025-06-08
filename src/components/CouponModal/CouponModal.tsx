import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import CouponItem from '../CouponItem/CouponItem';
import InfoMessage from '../InfoMessage/InfoMessage';
import Text from '../common/Text/Text';
import { validatedCouponList } from '../../types/coupon';
import { useEffect, useState } from 'react';
import useCouponCombos from '../../hooks/useCouponCombos';
import { useCartContext } from '../../context/CartContext';

function CouponModal({
  isOpen,
  onClose,
  validatedCouponList,
  checkedCoupon,
  totalDiscount,
  onCouponAccept,
}: {
  isOpen: boolean;
  onClose: () => void;
  validatedCouponList: validatedCouponList[];
  checkedCoupon: number[];
  totalDiscount: number;
  onCouponAccept: (couponIds: number[]) => void;
}) {
  const {
    data: cartItems,
    selectedItems,
    subTotal,
    deliveryFee,
  } = useCartContext();

  const [tempCoupon, setTempCoupon] = useState<number[]>(checkedCoupon);

  const modalResult = useCouponCombos(
    tempCoupon,
    cartItems.filter((item) => selectedItems.includes(item.id)),
    validatedCouponList,
    subTotal,
    deliveryFee
  );

  useEffect(() => {
    if (isOpen) {
      setTempCoupon(checkedCoupon);
    }
  }, [isOpen, checkedCoupon]);

  const handleToggle = (id: number) => {
    const newTempCoupons = tempCoupon.includes(id)
      ? tempCoupon.filter((x) => x !== id)
      : [...tempCoupon, id];

    if (newTempCoupons.length > 2) {
      alert('최대 2개의 쿠폰만 적용할 수 있습니다.');
      return;
    }
    setTempCoupon(newTempCoupons);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="쿠폰을 선택해 주세요">
      <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {validatedCouponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          isChecked={tempCoupon.includes(coupon.id)}
          onCheck={handleToggle}
          isDisabled={coupon.isExpired}
        />
      ))}
      <Button
        color="gray"
        variant="secondary"
        onClick={() => onCouponAccept(tempCoupon)}
      >
        <Text varient="body">{`총 ${modalResult?.totalDiscount.toLocaleString()} 할인 쿠폰 사용하기`}</Text>
      </Button>
    </Modal>
  );
}

export default CouponModal;
