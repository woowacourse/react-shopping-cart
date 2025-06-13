import { useEffect, useMemo } from "react";
import { Coupon } from "../../types/coupon";
import useCoupon from "../../hooks/useCoupon";
import * as S from "./CouponModal.styled";
import CheckBox from "../CheckBox/CheckBox";
import {
  useCouponSelectContext,
  useCouponSelectDispatch,
} from "../../stores/CouponContext";
import { ResponseCartItem } from "../../types/order";
import { CouponFormatter } from "../../utils/couponFormatter";
import { formatDate } from "../../utils/formatters";
import { CouponCalculator } from "../../utils/couponCalculator";
import { OrderCalculator } from "../../utils/orderCalculator";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupons: (selectedCoupons: Coupon[]) => void;
  cartItems: ResponseCartItem[];
  isRemoteArea: boolean;
  appliedCoupons: Coupon[];
}

function CouponModal({
  isOpen,
  onClose,
  onApplyCoupons,
  cartItems,
  isRemoteArea,
  appliedCoupons,
}: CouponModalProps) {
  const { couponList, isLoading, error } = useCoupon();
  const couponSelectState = useCouponSelectContext();
  const couponSelectDispatch = useCouponSelectDispatch();

  const selectedCouponIds = couponSelectState
    .filter((item) => item.selected)
    .map((item) => item.id);
  const selectedCoupons = couponList.filter((coupon) =>
    selectedCouponIds.includes(coupon.id)
  );

  const orderInfo = useMemo(() => {
    const originalOrderAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const originalDeliveryFee = OrderCalculator.calculateBaseDeliveryFee(
      originalOrderAmount,
      isRemoteArea
    );

    return {
      cartItems,
      originalOrderAmount,
      originalDeliveryFee,
      isRemoteArea,
    };
  }, [cartItems, isRemoteArea]);

  const optimalCouponResult = useMemo(() => {
    if (selectedCoupons.length === 0) {
      return {
        totalDiscount: 0,
        deliveryDiscount: 0,
        optimalCoupons: [],
      };
    }

    const optimalResult = CouponCalculator.findOptimalCouponCombination(
      selectedCoupons as unknown as Coupon[],
      orderInfo
    );

    return {
      totalDiscount:
        optimalResult.totalDiscount + optimalResult.deliveryDiscount,
      deliveryDiscount: optimalResult.deliveryDiscount,
      optimalCoupons: optimalResult.appliedCoupons,
    };
  }, [selectedCoupons, orderInfo]);

  const { totalDiscount } = optimalCouponResult;

  const couponAvailability = useMemo(() => {
    return couponList.reduce(
      (acc, coupon) => {
        const isCurrentlySelected = selectedCoupons.some(
          (selectedCoupon) => selectedCoupon.id === coupon.id
        );

        if (isCurrentlySelected) {
          acc[coupon.id] = true;
          return acc;
        }

        const discount = CouponCalculator.calculateSingleCouponDiscount(
          coupon as unknown as Coupon,
          orderInfo,
          []
        );
        acc[coupon.id] = discount > 0;
        return acc;
      },
      {} as Record<number, boolean>
    );
  }, [couponList, orderInfo, selectedCoupons]);

  useEffect(() => {
    if (optimalCouponResult.optimalCoupons.length > 0) {
      const currentSelectedIds = selectedCouponIds.sort();
      const optimalIds = optimalCouponResult.optimalCoupons
        .map((c) => c.id)
        .sort();

      const isDifferent =
        currentSelectedIds.length !== optimalIds.length ||
        currentSelectedIds.some((id, index) => id !== optimalIds[index]);

      if (isDifferent && selectedCoupons.length > 0) {
        couponSelectDispatch({ type: "CLEAR_COUPON_SELECT", payload: {} });

        optimalCouponResult.optimalCoupons.forEach((coupon) => {
          couponSelectDispatch({
            type: "ADD_COUPON_SELECT",
            payload: { id: coupon.id },
          });
        });

        onApplyCoupons(optimalCouponResult.optimalCoupons);
      }
    }
  }, [
    optimalCouponResult.optimalCoupons,
    selectedCouponIds,
    selectedCoupons.length,
    couponSelectDispatch,
    onApplyCoupons,
  ]);

  useEffect(() => {
    if (couponList.length > 0) {
      couponSelectDispatch({
        type: "SET_COUPON_SELECT",
        payload: { coupons: couponList },
      });

      appliedCoupons.forEach((appliedCoupon) => {
        couponSelectDispatch({
          type: "ADD_COUPON_SELECT",
          payload: { id: appliedCoupon.id },
        });
      });
    }
  }, [couponList, couponSelectDispatch, appliedCoupons]);

  const handleCouponSelect = (couponId: number) => {
    if (!couponAvailability[couponId]) {
      return;
    }

    const currentItem = couponSelectState.find((item) => item.id === couponId);
    const selectedCount = couponSelectState.filter(
      (item) => item.selected
    ).length;

    if (currentItem?.selected) {
      couponSelectDispatch({
        type: "REMOVE_COUPON_SELECT",
        payload: { id: couponId },
      });

      const newSelectedCoupons = selectedCoupons.filter(
        (coupon) => coupon.id !== couponId
      );
      onApplyCoupons(newSelectedCoupons as unknown as Coupon[]);
    } else {
      if (selectedCount >= 2) {
        alert("쿠폰은 최대 2개까지만 사용할 수 있습니다.");
        return;
      }

      couponSelectDispatch({
        type: "ADD_COUPON_SELECT",
        payload: { id: couponId },
      });

      const newCoupon = couponList.find((coupon) => coupon.id === couponId);
      if (newCoupon) {
        const newSelectedCoupons = [...selectedCoupons, newCoupon];
        onApplyCoupons(newSelectedCoupons as unknown as Coupon[]);
      }
    }
  };

  const handleApply = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const hasSelectedCoupons = selectedCoupons.length > 0;

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
                  const isAvailable = couponAvailability[coupon.id];

                  return (
                    <div key={coupon.id}>
                      <S.CouponDivider />
                      <S.CouponItem
                        selected={isSelected}
                        disabled={!isAvailable}
                        onClick={() => handleCouponSelect(coupon.id)}
                      >
                        <S.CouponCheckboxWrapper>
                          <CheckBox
                            isChecked={isSelected}
                            disabled={!isAvailable}
                            onClick={() => handleCouponSelect(coupon.id)}
                          />
                          <S.CouponName disabled={!isAvailable}>
                            {coupon.description}
                          </S.CouponName>
                        </S.CouponCheckboxWrapper>
                        <S.CouponContent>
                          <S.CouponExpiry disabled={!isAvailable}>
                            만료일: {formatDate(coupon.expirationDate)}
                          </S.CouponExpiry>
                          {CouponFormatter.getCouponDetails(
                            coupon as unknown as Coupon
                          ).map((detail, idx) => (
                            <S.CouponDetail key={idx} disabled={!isAvailable}>
                              {detail}
                            </S.CouponDetail>
                          ))}
                          {!isAvailable && (
                            <S.CouponDetail disabled={true}>
                              사용 조건을 만족하지 않습니다.
                            </S.CouponDetail>
                          )}
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
