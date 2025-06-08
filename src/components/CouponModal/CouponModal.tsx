import { useState, useEffect } from "react";
import Modal from "../@common/Modal/Modal";
import Text from "../@common/Text/Text";
import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import { Coupon } from "../../apis/coupons";
import { css } from "@emotion/css";
import OrbitSpinner from "../@common/OrbitSpinner/OrbitSpinner";
import FullWidthButton from "../@common/Button/FullWidthButton/FullWidthButton";
import LabeledCheckbox from "../@common/LabeledCheckbox/LabeledCheckbox";
import { MAX_COUPON_COUNT } from "../../constants";
import { formatDate } from "../../utils/formatDate";
import { formatTimeRange } from "../../utils/formatTimeRange";
import { useCartItemContext } from "../../contexts/useCartItemContext";
import { useSelectedItems } from "../../hooks/useSelectedItems";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const { coupons, isLoading, fetchError, fetchCoupons } = useFetchCoupons();
  const { selectedCoupons, setSelectedCoupons, setAppliedCoupons } =
    useCartItemContext();
  const { selectedItems } = useSelectedItems();
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[]>([]);

  const orderPrice = selectedItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
      const validSelectedCoupons = selectedCoupons.filter((coupon) =>
        isCouponAvailable(coupon)
      );
      setTempSelectedCoupons(validSelectedCoupons);
    }
  }, [isOpen, selectedCoupons, orderPrice]);

  const isCouponAvailable = (coupon: Coupon): boolean => {
    switch (coupon.discountType) {
      case "fixed":
        return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
      case "percentage":
        // TODO: 시간 조건은 나중에 추가
        return true;
      case "freeShipping":
        return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
      case "buyXgetY":
        // TODO: 수량 조건은 나중에 추가
        return true;
      default:
        return true;
    }
  };

  const handleCouponToggle = (coupon: Coupon) => {
    if (!isCouponAvailable(coupon)) {
      return;
    }

    const isSelected = tempSelectedCoupons.some((c) => c.id === coupon.id);

    if (isSelected) {
      setTempSelectedCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
    } else {
      if (tempSelectedCoupons.length < MAX_COUPON_COUNT) {
        setTempSelectedCoupons((prev) => [...prev, coupon]);
      }
    }
  };

  const handleConfirm = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setAppliedCoupons(tempSelectedCoupons);
    onClose();
  };

  const modalContent = (
    <div className={CouponModalContent}>
      {isLoading ? (
        <div className={SpinnerWrapper}>
          <OrbitSpinner />
        </div>
      ) : fetchError ? (
        <Text text={fetchError} />
      ) : coupons.length === 0 ? (
        <Text text="사용 가능한 쿠폰이 없습니다." />
      ) : (
        <>
          <div className={InfoRow}>
            <img src="./info-icon.svg" alt="info" />
            <Text
              text={`쿠폰은 최대 ${MAX_COUPON_COUNT}개 까지 사용할 수 있습니다.`}
            />
          </div>
          <div className={CouponList}>
            {coupons.map((coupon) => {
              const isSelected = tempSelectedCoupons.some(
                (c) => c.id === coupon.id
              );
              const isAvailable = isCouponAvailable(coupon);

              return (
                <div
                  key={coupon.id}
                  className={`${CouponItem} ${isSelected ? "selected" : ""} ${
                    !isAvailable ? "disabled" : ""
                  }`}
                  onClick={() => handleCouponToggle(coupon)}
                >
                  <LabeledCheckbox
                    labelText={coupon.description}
                    isSelected={isSelected && isAvailable}
                    textType="medium"
                    onClick={() => handleCouponToggle(coupon)}
                  />
                  <Text text={`만료일: ${formatDate(coupon.expirationDate)}`} />
                  {coupon.minimumAmount && (
                    <Text
                      text={`최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`}
                    />
                  )}
                  {coupon.availableTime && (
                    <Text
                      text={`사용 가능 시간: ${formatTimeRange(
                        coupon.availableTime.start,
                        coupon.availableTime.end
                      )}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <Modal
      position="center"
      size="small"
      title="쿠폰 선택"
      content={modalContent}
      onClose={onClose}
      buttonElements={
        <FullWidthButton
          variant="dark"
          text={`총 5,000원 할인 쿠폰 사용하기`} // TODO: 쿠폰 할인 금액 계산 로직 추가
          onClick={handleConfirm}
        />
      }
    />
  );
};

export default CouponModal;

const CouponModalContent = css`
  min-height: 200px;
`;

const SpinnerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const CouponList = css`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CouponItem = css`
  border-top: 1px solid #e0e0e0;
  padding: 12px 0;
  cursor: pointer;

  &.disabled {
    color: #b0b0b0;
    cursor: default;
  }
`;

const InfoRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;
