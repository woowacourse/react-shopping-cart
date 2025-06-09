import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import CouponItem from '../CouponItem/CouponItem';
import InfoMessage from '../InfoMessage/InfoMessage';
import Text from '../common/Text/Text';
import { validatedCouponList } from '../../types/coupon';
import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { getBestCouponCombo } from '../../utils/couponDiscount';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinning';

function CouponModal({
  isLoading,
  isOpen,
  onClose,
  validatedCouponList,
  checkedCoupon,
  onCouponAccept,
}: {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  validatedCouponList: validatedCouponList[];
  checkedCoupon: number[] | null;
  onCouponAccept: (couponIds: number[]) => void;
}) {
  const {
    data: cartItems,
    selectedItems,
    subTotal,
    deliveryFee,
  } = useCartContext();

  const [tempCoupon, setTempCoupon] = useState<number[] | null>(checkedCoupon);

  const modalResult = getBestCouponCombo(
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
    if (tempCoupon === null) {
      setTempCoupon([id]);
      return;
    }
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
          {validatedCouponList.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              isChecked={tempCoupon?.includes(coupon.id) ?? false}
              onCheck={handleToggle}
              isDisabled={coupon.isExpired}
            />
          ))}
          <Button
            color="gray"
            variant="secondary"
            onClick={() => onCouponAccept(tempCoupon ?? [])}
          >
            <Text varient="body">{`총 ${modalResult?.totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기`}</Text>
          </Button>
        </>
      )}
    </Modal>
  );
}

export default CouponModal;
