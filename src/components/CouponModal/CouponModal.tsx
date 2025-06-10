import { useState, useEffect } from "react";
import Modal from "../@common/Modal/Modal";
import Text from "../@common/Text/Text";
import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import { Coupon } from "../../apis/coupons";
import { css } from "@emotion/css";
import OrbitSpinner from "../@common/OrbitSpinner/OrbitSpinner";
import FullWidthButton from "../@common/Button/FullWidthButton/FullWidthButton";
import LabeledSelectbox from "../@common/LabeledSelectbox/LabeledSelectbox";
import { MAX_COUPON_COUNT } from "../../constants";
import { formatDate } from "../../utils/formatDate";
import { formatTimeRange } from "../../utils/formatTimeRange";
import { useCouponContext } from "../../contexts/CouponContext";
import { useCouponValidation } from "../../hooks/useCouponValidation";
import { useCouponDiscount } from "../../hooks/useCouponDiscount";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const { coupons, isLoading, fetchError, fetchCoupons } = useFetchCoupons();
  const { selectedCoupons, setSelectedCoupons, setAppliedCoupons } =
    useCouponContext();
  const { isCouponValid } = useCouponValidation();
  const { couponDiscount } = useCouponDiscount();
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
      setTempSelectedCoupons([...selectedCoupons]);
    }
  }, [isOpen, selectedCoupons]);

  useEffect(() => {
    if (isOpen) {
      setAppliedCoupons(tempSelectedCoupons);
    }
  }, [tempSelectedCoupons, isOpen, setAppliedCoupons]);

  const handleCouponToggle = (coupon: Coupon) => {
    if (!isCouponValid(coupon)) {
      return;
    }

    const isSelected = tempSelectedCoupons.some((c) => c.id === coupon.id);

    if (isSelected) {
      setTempSelectedCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
    } else {
      if (tempSelectedCoupons.length < MAX_COUPON_COUNT) {
        setTempSelectedCoupons((prev) => [...prev, coupon]);
      } else {
        setTempSelectedCoupons((prev) => [...prev.slice(1), coupon]);
      }
    }
  };

  const handleConfirm = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setAppliedCoupons(tempSelectedCoupons);
    onClose();
  };

  const handleClose = () => {
    setAppliedCoupons(selectedCoupons);
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
              const isAvailable = isCouponValid(coupon);

              return (
                <div
                  key={coupon.id}
                  className={`${CouponItem} ${isSelected ? "selected" : ""} ${
                    !isAvailable ? "disabled" : ""
                  }`}
                  onClick={() => handleCouponToggle(coupon)}
                >
                  <LabeledSelectbox
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
      onClose={handleClose}
      buttonElements={
        <FullWidthButton
          variant="dark"
          text={`총 ${couponDiscount.toLocaleString()}원 할인 쿠폰 사용하기`}
          onClick={handleConfirm}
        />
      }
    />
  );
};

export default CouponModal;

const CouponModalContent = css`
  min-height: 200px;
  max-height: 60vh;
  overflow-y: auto;
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
