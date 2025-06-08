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

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCouponSelect?: (coupon: Coupon) => void;
}

const CouponModal = ({ isOpen, onClose, onCouponSelect }: CouponModalProps) => {
  const { coupons, isLoading, fetchError, fetchCoupons } = useFetchCoupons();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
    }
  }, [isOpen]);

  const handleCouponSelect = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleConfirm = () => {
    if (selectedCoupon && onCouponSelect) {
      onCouponSelect(selectedCoupon);
    }
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
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`${CouponItem} ${
                  selectedCoupon?.id === coupon.id ? "selected" : ""
                }`}
                onClick={() => handleCouponSelect(coupon)}
              >
                <LabeledCheckbox
                  labelText={coupon.description}
                  isSelected={true}
                  textType="medium"
                  onClick={() => {}}
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
            ))}
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
          text="3,000원 할인"
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
`;

const InfoRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;
