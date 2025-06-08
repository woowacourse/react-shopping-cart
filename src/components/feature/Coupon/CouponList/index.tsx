import * as S from "./CouponList.styles";
import Coupon from "../Coupon";
import { CouponResponse } from "../../../../type/coupon";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { MAX_COUPON_COUNT } from "../../../../pages/OrderConfirm/constant";
import { CartProduct } from "../../../../type/cart";
import useSelectedCoupon from "../../../../hooks/useSelectedCoupon";
import { isAvailable, getSelectedCartItems } from "./utils";

interface Props {
  coupons: CouponResponse[];
  totalPrice: number;
  isRemoteArea: boolean;
  cartItems: CartProduct[];
  selectedCartIds: number[];
  onApplyDiscount: (discount: number) => void;
}

const CouponList = ({
  coupons,
  totalPrice,
  isRemoteArea,
  cartItems,
  selectedCartIds,
  onApplyDiscount,
}: Props) => {
  const { selectedIds, handleSelectCoupon } = useSelectedCoupon();

  const calculateDiscount = (coupon: CouponResponse) => {
    switch (coupon.discountType) {
      case "fixed":
        return coupon.discount;

      case "buyXgetY": {
        const selectedCartItems = cartItems.filter((item: CartProduct) =>
          selectedCartIds.includes(item.id)
        );

        const eligibleItems = selectedCartItems.filter(
          (item: CartProduct) => item.quantity > coupon.buyQuantity
        );

        eligibleItems.sort(
          (a: CartProduct, b: CartProduct) => b.product.price - a.product.price
        );

        return eligibleItems[0].product.price;
      }

      case "freeShipping": {
        const deliveryPrice = totalPrice >= 100_000 ? 0 : 3000;
        return isRemoteArea ? 3000 + deliveryPrice : deliveryPrice;
      }

      case "percentage":
        return totalPrice * 0.3;

      default:
        return 0;
    }
  };

  const getTotalDiscount = () => {
    if (selectedIds.length === 0) return 0;

    const selectedCoupons = coupons?.filter((coupon) =>
      selectedIds.includes(coupon.id)
    );

    return selectedCoupons?.reduce((total, current) => {
      return (total += calculateDiscount(current));
    }, 0);
  };

  const getValidCoupons = () => {
    if (!coupons) return [];
    const selectedCartItems = getSelectedCartItems(cartItems, selectedCartIds);
    return coupons.filter((coupon: CouponResponse) =>
      isAvailable(coupon, totalPrice, isRemoteArea, selectedCartItems)
    );
  };

  return (
    <S.Container>
      <S.Title>쿠폰을 선택해 주세요</S.Title>
      <S.Notice>
        ※ 쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할 수 있습니다.
      </S.Notice>
      {coupons.map((coupon) => (
        <Coupon
          key={coupon.id}
          coupon={coupon}
          isChecked={selectedIds.includes(coupon.id)}
          onSelect={() => handleSelectCoupon(coupon.id)}
          isValid={getValidCoupons().includes(coupon)}
        />
      ))}
      <Button
        title={`총 ${getTotalDiscount()}원 할인 쿠폰 사용하기`}
        onClick={() => {
          onApplyDiscount(getTotalDiscount());
        }}
        css={css`
          width: 100%;
          padding: 15px 0;
          background-color: #000;
          color: white;
          font-weight: 700;
          font-size: 16px;
        `}
      />
    </S.Container>
  );
};

export default CouponList;
