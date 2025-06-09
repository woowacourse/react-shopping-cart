import { useEffect } from "react";
import { useSelectedCouponContext } from "../../stores/SelectedCouponContext";
import { CouponType, ResponseCartItem } from "../../types/types";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./CouponItem.styled";
import { getCouponText, getPossibleToUse } from "../../domains/coupon";
import useCouponAction from "../../hooks/useCouponAction";
import { getIsSelectedCoupon } from "../../domains/selectedInfo";

export default function CouponItem({
  data,
  orderPrice,
  orderProducts,
  deliveryPrice,
}: {
  data: CouponType;
  orderPrice: number;
  orderProducts: ResponseCartItem[];
  deliveryPrice: number;
}) {
  const selectedCoupons = useSelectedCouponContext();
  const { addCoupon, removeCoupon } = useCouponAction();

  const isSelectedCoupon = getIsSelectedCoupon(
    data.discountType,
    selectedCoupons
  );

  const canUse = getPossibleToUse({
    data,
    orderPrice,
    orderProducts,
    deliveryPrice,
    selectedCoupons,
  });

  const handleChange = () => {
    if (isSelectedCoupon) {
      removeCoupon(data);
      return;
    }

    if (selectedCoupons.length >= 2) return;
    addCoupon(data);
  };

  useEffect(() => {
    if (deliveryPrice === 0 && data.discountType === "freeShipping") {
      removeCoupon(data);
    }
  }, [data, deliveryPrice, removeCoupon]);

  return (
    <S.Container getPossibleToUse={canUse}>
      <CheckBox
        id={data.id}
        text={data.description}
        isChecked={isSelectedCoupon}
        size="large"
        onChange={() => handleChange()}
        disabled={!canUse}
      />
      <S.CouponText>
        <div>
          {getCouponText(data).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </S.CouponText>
    </S.Container>
  );
}
