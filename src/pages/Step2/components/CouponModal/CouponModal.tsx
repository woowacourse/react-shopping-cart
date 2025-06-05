import { Button, Modal, Spacing, Text } from "@/components";
import { CloseIcon, Info } from "@/components/icons";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { useShoppingCartContext } from "@/pages/MainPage/context";
import { CouponService } from "@/services";
import { css } from "@emotion/react";
import { useMemo } from "react";
import CouponItem from "./CouponItem";

interface CouponModalProps {
  closeModal: () => void;
}

export default function CouponModal({ closeModal }: CouponModalProps) {
  const { data: coupons } = useCouponQuery();
  const { data: cartItems } = useCartItemQuery();
  const { selectedItemIds } = useShoppingCartContext();
  const selectedCartItems = cartItems?.content.filter((item) => selectedItemIds.includes(item.id));

  const { selectedCouponIds, setSelectedCouponIds, isFar } = useShoppingCartContext();

  const handleSelectCoupon = (couponId: number) => {
    setSelectedCouponIds((prev) => {
      const isSelected = prev.includes(couponId);

      if (prev.length === 2 && !isSelected) return prev;
      return isSelected ? prev.filter((id) => id !== couponId) : [...prev, couponId];
    });
  };

  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountPrice = selectedCoupons?.reduce((acc, coupon) => {
    const couponService = new CouponService(selectedCartItems);
    return acc + couponService.calculateDiscountPrice(coupon, isFar) || 0;
  }, 0);

  const availableCoupons = useMemo(
    () => coupons?.filter((coupon) => new CouponService(selectedCartItems).canAdjustCoupon(coupon)),
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
          <Info /> 쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>

        <Spacing size={16} />

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {coupons?.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              isSelected={selectedCouponIds.includes(coupon.id)}
              onSelect={() => handleSelectCoupon(coupon.id)}
              isCouponAvailable={availableCoupons?.includes(coupon)}
            />
          ))}
        </div>
      </Modal.Content>

      <Modal.Bottom>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={closeModal}
        >
          총 {totalDiscountPrice?.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}
