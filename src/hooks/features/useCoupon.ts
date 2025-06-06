import { useState } from "react";
import useModal from "../@common/useModal";
import type { CouponType } from "../../types/response";
import { getCouponList } from "../../services/couponService";
import useApiHandler from "../@common/useApiHandler";
import { getValidExpirationCoupons } from "../../domains/coupon";

const useCoupon = () => {
  const { callApi, loadingState } = useApiHandler();

  const { isModalOpen, openModal, closeModal } = useModal();

  const [couponList, setCouponList] = useState<CouponType[]>([]);
  const openCouponModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const fetchData = async () => {
      const couponList = await callApi<CouponType[]>(
        getCouponList,
        "쿠폰 목록을 불러왔습니다.",
        "initialLoading"
      );
      if (!couponList) {
        return;
      }
      const validatedCouponList = getValidExpirationCoupons(couponList);
      setCouponList(validatedCouponList);
    };

    fetchData();
    openModal();
  };
  return { isModalOpen, openCouponModal, closeModal, couponList, loadingState };
};

export default useCoupon;
