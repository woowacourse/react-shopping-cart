import { CouponApi } from "@/apis";
import { Button, Spacing, Text } from "@/components";
import { CloseIcon, Info } from "@/components/icons";
import Modal from "@/components/Modal/Modal";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules";
import { css } from "@emotion/react";
import CouponItem from "./CouponItem";
import { useShoppingCartContext } from "@/pages/MainPage/context";

export default function CouponModal() {
  const { data: coupons } = useQuery({
    queryFn: CouponApi.getAllCoupons,
    queryKey: QUERY_KEY.coupon,
  });

  const { selectedCouponIds, setSelectedCouponIds } = useShoppingCartContext();

  const handleSelectCoupon = (couponId: number) => {
    setSelectedCouponIds((prev) => {
      const isSelected = prev.includes(couponId);

      if (prev.length === 2 && !isSelected) return prev;
      return isSelected ? prev.filter((id) => id !== couponId) : [...prev, couponId];
    });
  };

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
          총 6,000원 할인 쿠폰 사용하기
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}
