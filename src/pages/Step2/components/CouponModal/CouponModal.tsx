import { CouponApi } from "@/apis";
import { Button, Spacing, Text } from "@/components";
import { CloseIcon, Info } from "@/components/icons";
import Modal from "@/components/Modal/Modal";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules";
import { css } from "@emotion/react";
import CouponItem from "./CouponItem";
import { useShoppingCartContext } from "@/pages/MainPage/context";
import { CouponService } from "@/services";
import { useCartItem } from "@/hooks";
import { useEffect } from "react";

export default function CouponModal() {
  const { data: coupons } = useQuery({
    queryFn: CouponApi.getAllCoupons,
    queryKey: QUERY_KEY.coupon,
  });
  const { cartItems } = useCartItem();

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
    const couponService = new CouponService(cartItems.content);
    return acc + couponService.calculateDiscountPrice(coupon, isFar) || 0;
  }, 0);

  const availableCoupons = coupons?.filter((coupon) => new CouponService(cartItems.content).canAdjustCoupon(coupon));

  useEffect(() => {
    if (selectedCouponIds.length > 0) return;
    const mostDiscountCombination = availableCoupons
      ?.sort((a, b) => {
        const couponService = new CouponService(cartItems.content);
        return (
          couponService.calculateDiscountPrice(a, isFar) - couponService.calculateDiscountPrice(b, isFar) || a.id - b.id
        );
      })
      .slice(0, 2);

    setSelectedCouponIds(mostDiscountCombination?.map((coupon) => coupon.id) || []);
  }, [availableCoupons, cartItems.content, isFar, selectedCouponIds.length, setSelectedCouponIds]);

  return (
    <Modal isBackdropClose>
      <Modal.Top>
        <Modal.Title>쿠폰 적용</Modal.Title>
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
        >
          총 {totalDiscountPrice?.toLocaleString()}원 할인 쿠폰 사용하기
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}
