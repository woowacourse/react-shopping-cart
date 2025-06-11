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
import { COUPON } from '../../constants/coupon';
import { toggleArrayItems } from '../../utils/arrayUtils';

function CouponModal({
  isLoading,
  isOpen,
  onCloseButtonClick,
  validatedCouponList,
  checkedCoupon,
  onCouponAccept,
}: {
  isLoading: boolean;
  isOpen: boolean;
  onCloseButtonClick: () => void;
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

  const [draftSelectedCouponIds, setDraftSelectedCouponIds] = useState<
    number[] | null
  >(checkedCoupon);

  const modalResult = getBestCouponCombo(
    draftSelectedCouponIds,
    cartItems.filter((item) => selectedItems.includes(item.id)),
    validatedCouponList,
    subTotal,
    deliveryFee
  );

  useEffect(() => {
    if (isOpen) {
      setDraftSelectedCouponIds(checkedCoupon);
    }
  }, [isOpen, checkedCoupon]);

  const handleCouponCheck = (id: number) => {
    if (draftSelectedCouponIds === null) {
      setDraftSelectedCouponIds([id]);
      return;
    }

    const newDraftSelectedCouponIds = toggleArrayItems(
      draftSelectedCouponIds,
      id
    );

    if (newDraftSelectedCouponIds.length > COUPON.MAX_COUPON_COUNT) {
      alert('최대 2개의 쿠폰만 적용할 수 있습니다.');
      return;
    }

    setDraftSelectedCouponIds(newDraftSelectedCouponIds);
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseButtonClick={onCloseButtonClick}
      title="쿠폰을 선택해 주세요"
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
          {validatedCouponList.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              isChecked={draftSelectedCouponIds?.includes(coupon.id) ?? false}
              onCheck={handleCouponCheck}
              isDisabled={coupon.isExpired}
            />
          ))}
          <Button
            color="gray"
            variant="secondary"
            onClick={() => onCouponAccept(draftSelectedCouponIds ?? [])}
          >
            <Text varient="body">{`총 ${modalResult?.totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기`}</Text>
          </Button>
        </>
      )}
    </Modal>
  );
}

export default CouponModal;
