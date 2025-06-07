import { useEffect } from "react";
import { Coupon } from "../../api/couponApi";
import useCoupon from "../../hooks/useCoupon";
import * as S from "./CouponModal.styled";
import CheckBox from "../CheckBox/CheckBox";
import {
  useCouponSelectContext,
  useCouponSelectDispatch,
} from "../../stores/CouponContext";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupons: (selectedCoupons: Coupon[]) => void;
}

function CouponModal({ isOpen, onClose, onApplyCoupons }: CouponModalProps) {
  const { couponList, isLoading, error } = useCoupon();
  const couponSelectState = useCouponSelectContext();
  const couponSelectDispatch = useCouponSelectDispatch();

  useEffect(() => {
    if (couponList.length > 0) {
      couponSelectDispatch({
        type: "SET_COUPON_SELECT",
        payload: { coupons: couponList },
      });
    }
  }, [couponList, couponSelectDispatch]);

  const handleCouponSelect = (couponId: number) => {
    const currentItem = couponSelectState.find((item) => item.id === couponId);
    const selectedCount = couponSelectState.filter(
      (item) => item.selected
    ).length;

    if (currentItem?.selected) {
      couponSelectDispatch({
        type: "REMOVE_COUPON_SELECT",
        payload: { id: couponId },
      });
    } else {
      if (selectedCount >= 2) {
        alert("쿠폰은 최대 2개까지만 사용할 수 있습니다.");
        return;
      }
      couponSelectDispatch({
        type: "ADD_COUPON_SELECT",
        payload: { id: couponId },
      });
    }
  };

  const handleApply = () => {
    const selectedCouponIds = couponSelectState
      .filter((item) => item.selected)
      .map((item) => item.id);

    const selectedCouponData = couponList.filter((coupon) =>
      selectedCouponIds.includes(coupon.id)
    );

    onApplyCoupons(selectedCouponData);
    onClose();
  };

  const handleClose = () => {
    couponSelectDispatch({
      type: "CLEAR_COUPON_SELECT",
      payload: {},
    });
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour < 12 ? "오전" : "오후";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${ampm} ${displayHour}시`;
  };

  const renderCouponDetails = (coupon: Coupon) => {
    const details = [];

    if (coupon.minimumAmount) {
      details.push(`최소 주문금액: ${coupon.minimumAmount.toLocaleString()}원`);
    }

    if (coupon.availableTime) {
      const startTime = formatTime(coupon.availableTime.start);
      const endTime = formatTime(coupon.availableTime.end);
      details.push(`사용 가능 시간: ${startTime}부터 ${endTime}까지`);
    }

    return details;
  };

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;
    const selectedCouponIds = couponSelectState
      .filter((item) => item.selected)
      .map((item) => item.id);

    const selectedCouponData = couponList.filter((coupon) =>
      selectedCouponIds.includes(coupon.id)
    );

    selectedCouponData.forEach((coupon) => {
      if (coupon.discountType === "fixed" && coupon.discount) {
        totalDiscount += coupon.discount;
      } else if (coupon.discountType === "percentage" && coupon.discount) {
        //임시로 10만원 주문 기준으로 계산
        totalDiscount += Math.floor(100000 * (coupon.discount / 100));
      }
    });

    return totalDiscount;
  };

  if (!isOpen) return null;

  const totalDiscount = calculateTotalDiscount();
  const selectedCount = couponSelectState.filter(
    (item) => item.selected
  ).length;
  const hasSelectedCoupons = selectedCount > 0;

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>쿠폰을 선택해주세요</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.TitleSpacer />

          {isLoading ? (
            <S.LoadingMessage>쿠폰을 불러오는 중...</S.LoadingMessage>
          ) : error ? (
            <S.ErrorMessage>
              쿠폰을 불러오는데 실패했습니다: {error}
            </S.ErrorMessage>
          ) : couponList.length === 0 ? (
            <S.EmptyMessage>사용 가능한 쿠폰이 없습니다.</S.EmptyMessage>
          ) : (
            <>
              <S.CouponDescription>
                ⚠️ 쿠폰은 최대 2개까지 사용할 수 있습니다.
              </S.CouponDescription>

              <S.CouponList>
                {couponList.map((coupon) => {
                  const selectState = couponSelectState.find(
                    (item) => item.id === coupon.id
                  );
                  const isSelected = selectState?.selected || false;

                  return (
                    <div key={coupon.id}>
                      <S.CouponDivider />

                      <S.CouponItem
                        selected={isSelected}
                        onClick={() => handleCouponSelect(coupon.id)}
                      >
                        <S.CouponCheckboxWrapper>
                          <CheckBox
                            isChecked={isSelected}
                            onClick={() => handleCouponSelect(coupon.id)}
                          />
                          <S.CouponName>{coupon.description}</S.CouponName>
                        </S.CouponCheckboxWrapper>
                        <S.CouponContent>
                          <S.CouponExpiry>
                            만료일: {formatDate(coupon.expirationDate)}
                          </S.CouponExpiry>
                          {renderCouponDetails(coupon).map((detail, idx) => (
                            <S.CouponDetail key={idx}>{detail}</S.CouponDetail>
                          ))}
                        </S.CouponContent>
                      </S.CouponItem>
                    </div>
                  );
                })}
              </S.CouponList>
            </>
          )}
        </S.ModalContent>

        <S.ModalFooter>
          <S.ApplyButton onClick={handleApply} disabled={!hasSelectedCoupons}>
            {hasSelectedCoupons
              ? `총 ${totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기`
              : "쿠폰을 선택해주세요"}
          </S.ApplyButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
}

export default CouponModal;
