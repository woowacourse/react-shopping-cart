import { useRecoilState } from "recoil";
import { couponCheckedAtom } from "../../recoil/atom/atom";

const useSortedCheckedCoupons = () => {
  const [checkedCoupons] = useRecoilState(couponCheckedAtom);

  const percentageCoupons = checkedCoupons.filter((coupon) => coupon.discountType === "percentage").sort((a, b) => b.discount - a.discount);

  const nonPercentageCoupons = checkedCoupons.filter((coupon) => coupon.discountType !== "percentage");

  const sortedCoupons = [...percentageCoupons, ...nonPercentageCoupons];

  return { sortedCoupons };
};

export default useSortedCheckedCoupons;
