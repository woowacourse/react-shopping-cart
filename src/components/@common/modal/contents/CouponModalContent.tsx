import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";

const mockCoupon = [
  {
    name: "쿠폰1",
    dueDate: new Date(),
    minimumOrderPrice: 10000,
    isSelected: false,
  },
  {
    name: "쿠폰2",
    dueDate: new Date(),
    minimumOrderPrice: 10000,
    isSelected: false,
  },
  {
    name: "쿠폰3",
    dueDate: new Date(),
    minimumOrderPrice: 10000,
    isSelected: false,
  },
];

const CouponModalContent = () => {
  return (
    <div css={S.couponModalContentContainer}>
      {mockCoupon.map((coupon) => (
        <CouponItem
          key={coupon.name}
          name={coupon.name}
          dueDate={coupon.dueDate}
          minimumOrderPrice={coupon.minimumOrderPrice}
          isSelected={coupon.isSelected}
        />
      ))}
    </div>
  );
};

export default CouponModalContent;
