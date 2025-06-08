import { Button, Modal, Spacing, Text } from "@/components";
import { CloseIcon, InfoIcon } from "@/components/icons";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import { CouponService } from "@/services";
import { css } from "@emotion/react";
import { useMemo } from "react";
import CouponItem from "./CouponItem";
import { MAX_COUPON_COUNT } from "@/constants";
import { useToast } from "@/modules";
import * as S from "./CouponModal.styles";

interface CouponModalProps {
  closeModal: () => void;
}

export default function CouponModal({ closeModal }: CouponModalProps) {
  const { data: coupons } = useCouponQuery();
  const { data: cartItems } = useCartItemQuery();
  const { selectedItemIds } = useShoppingCartContext();
  const selectedCartItems = cartItems.content.filter((item) => selectedItemIds.includes(item.id));
  const { showToast } = useToast();

  const { selectedCouponIds, setSelectedCouponIds, isFar } = useShoppingCartContext();

  const handleSelectCoupon = (couponId: number) => {
    setSelectedCouponIds((prev) => {
      const isSelected = prev.includes(couponId);

      if (prev.length === MAX_COUPON_COUNT && !isSelected) {
        showToast({
          message: `쿠폰은 최대 ${MAX_COUPON_COUNT}개까지 사용할 수 있습니다.`,
          variant: "error",
        });
        return prev;
      }
      return isSelected ? prev.filter((id) => id !== couponId) : [...prev, couponId];
    });
  };

  const selectedCoupons = coupons.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountAmount = selectedCoupons.reduce((acc, coupon) => {
    const couponService = new CouponService(selectedCartItems);
    return acc + couponService.calculateDiscountPrice(coupon, isFar) || 0;
  }, 0);

  const availableCoupons = useMemo(
    () => coupons.filter((coupon) => new CouponService(selectedCartItems).canAdjustCoupon(coupon)),
    [coupons, selectedCartItems],
  );

  return (
    <Modal isBackdropClose>
      <Modal.Top>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <Modal.Close>
          <CloseIcon />
        </Modal.Close>
      </Modal.Top>

      <Modal.Content>
        <Text
          variant="body-1"
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
          `}
        >
          <InfoIcon /> 쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할 수 있습니다.
        </Text>

        <Spacing size={16} />

        <S.CouponList>
          {coupons.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              isSelected={selectedCouponIds.includes(coupon.id)}
              onSelect={() => handleSelectCoupon(coupon.id)}
              isCouponAvailable={availableCoupons.includes(coupon)}
            />
          ))}
        </S.CouponList>
      </Modal.Content>

      <Modal.Bottom>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={closeModal}
        >
          총 {totalDiscountAmount?.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}
