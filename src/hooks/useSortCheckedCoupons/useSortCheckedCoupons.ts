import { useRecoilState } from "recoil";
import { couponCheckedAtom } from "../../recoil/atom/atom";

const useSortedCheckedCoupons = () => {
  const [checkedCoupons] = useRecoilState(couponCheckedAtom);

  const percentageCoupons = checkedCoupons.filter((coupon) => coupon.discountType === "percentage");

  const nonPercentageCoupons = checkedCoupons.filter((coupon) => coupon.discountType !== "percentage");

  const sortedCoupons = [...percentageCoupons, ...nonPercentageCoupons];

  return { sortedCoupons };
};

export default useSortedCheckedCoupons;
