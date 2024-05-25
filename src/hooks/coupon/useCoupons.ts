import {couponsState} from "@/recoil/coupons";
import {freeShippingCouponState} from "@/recoil/shippingFeeType";
import {Coupon} from "@/types/coupon";
import {useRecoilState, useSetRecoilState} from "recoil";
import {COUPON_ORDER_LIMIT} from "@/constants/couponAndOrder.ts";

const useCoupons = () => {
    const [couponList, setCouponList] = useRecoilState(couponsState);
    const setFreeShippingCouponState = useSetRecoilState(freeShippingCouponState);

    const applyCoupon = (newCoupon: Coupon) => {
        if (isOverMaxCouponCount()) {
            replaceOldToNewCoupon();
        }
        if (newCoupon.discountType === "freeShipping") {
            setFreeShippingCouponState(true);
        }
        setCouponList((prev) => [...prev, newCoupon]);
    };

    const unapplyCoupon = (couponId: number) => {
        const targetCoupon = couponList.find((coupon) => coupon.id === couponId)!;
        if (targetCoupon.discountType === "freeShipping") {
            setFreeShippingCouponState(false);
        }
        const newCouponList = couponList.filter((coupon) => coupon.id !== couponId);
        setCouponList(newCouponList);
    };

    const isCouponApplied = (couponId: number) => {
        return couponList.find((coupon) => coupon.id === couponId);
    };

    const isOverMaxCouponCount = () => {
        if (couponList.length >= COUPON_ORDER_LIMIT) {
            return true;
        }
        return false;
    };

    const replaceOldToNewCoupon = () => {
        const oldCouponList = [...couponList];
        oldCouponList.shift();
        setCouponList(oldCouponList);
    };

    return {applyCoupon, unapplyCoupon, isCouponApplied, couponList};
};

export default useCoupons;
