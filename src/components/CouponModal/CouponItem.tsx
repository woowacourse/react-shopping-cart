import { useEffect } from "react";
import {
  useSelectedCouponContext,
  useSelectedCouponDispatch,
} from "../../stores/SelectedCouponContext";
import { CouponType, DiscountType, ResponseCartItem } from "../../types/types";
import formatPrice from "../../utils/formatPrice";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./CouponItem.styled";

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
  const getCouponText = (): string[] => {
    const discountType = data.discountType;
    const lines: string[] = [];

    const str = ["년", "월", "일"];
    const expireDateArr = data.expirationDate.split("-");
    const expDate = [];

    for (let i = 0; i < expireDateArr.length; i++) {
      expDate.push(expireDateArr[i] + str[i]);
    }

    lines.push(`만료일: ${expDate.join(" ")}`);

    switch (discountType) {
      case "fixed":
      case "freeShipping":
        lines.push(`최소 주문 금액: ${formatPrice(data.minimumAmount)}원`);
        break;
      case "percentage": {
        const start = data.availableTime.start.split(":")[0];
        const end = data.availableTime.end.split(":")[0];
        lines.push(
          `사용 가능 시간: 오전 ${start[0] === "0" ? start[1] : start}시부터 ${
            end[0] === "0" ? end[1] : end
          }시까지`
        );
        break;
      }

      default:
        break;
    }

    return lines;
  };

  const getIsSelectedCoupon = (discountType: DiscountType) =>
    selectedCoupons.some((coupon) => coupon.discountType === discountType);
  const selectedCoupons = useSelectedCouponContext();
  const selectedCouponDispatch = useSelectedCouponDispatch();

  const handleChange = (discountType: DiscountType) => {
    if (getIsSelectedCoupon(discountType)) {
      selectedCouponDispatch({
        type: "REMOVE_COUPON",
        payload: { coupon: data },
      });
    } else {
      if (selectedCoupons.length >= 2) return;
      selectedCouponDispatch({
        type: "ADD_COUPON",
        payload: { coupon: data },
      });
    }
  };

  const getPossibleToUse = () => {
    if (selectedCoupons.length === 2) {
      return getIsSelectedCoupon(data.discountType);
    }

    if (new Date(data.expirationDate) < new Date()) {
      return false;
    }

    switch (data.discountType) {
      case "fixed": {
        if (orderPrice < data.minimumAmount) {
          return false;
        }
        return true;
      }
      case "percentage": {
        const currentHour = new Date().getHours();
        const startHour = parseInt(data.availableTime.start.split(":")[0]);
        const endHour = parseInt(data.availableTime.end.split(":")[0]);

        if (currentHour < startHour || currentHour >= endHour) {
          return false;
        }

        return true;
      }
      case "buyXgetY": {
        const moreThanThreeProducts = orderProducts.filter(
          (product) => product.quantity >= 3
        );

        if (moreThanThreeProducts.length === 0) {
          return false;
        }

        return true;
      }
      case "freeShipping": {
        if (deliveryPrice === 0) {
          return false;
        }

        if (orderPrice < data.minimumAmount) {
          return false;
        }

        return true;
      }
      default:
        return true;
    }
  };

  const canUse = getPossibleToUse();

  useEffect(() => {
    if (deliveryPrice === 0 && data.discountType === "freeShipping") {
      selectedCouponDispatch({
        type: "REMOVE_COUPON",
        payload: { coupon: data },
      });
    }
  }, [data, deliveryPrice, selectedCouponDispatch]);

  return (
    <S.Container getPossibleToUse={canUse}>
      <CheckBox
        id={data.id}
        text={data.description}
        isChecked={getIsSelectedCoupon(data.discountType)}
        size="large"
        onChange={() => handleChange(data.discountType)}
        disabled={!canUse}
      />
      <S.CouponText>
        <div>
          {getCouponText().map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </S.CouponText>
    </S.Container>
  );
}
