import { useState } from "react";
import useModal from "../@common/useModal";
import type { CouponType } from "../../types/response";
import { getCouponList } from "../../services/couponService";
import useApiHandler from "../@common/useApiHandler";
import { getValidExpirationCoupons } from "../../domains/coupon/validateCoupon";

const useCouponModal = () => {
  const { callApi, loadingState } = useApiHandler();

  const { isModalOpen, openModal, closeModal } = useModal();

  const [couponList, setCouponList] = useState<CouponType[]>([]);
  const openCouponModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal();

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
  };

  const closeCouponModal = () => {
    closeModal();
  };

  return {
    isModalOpen,
    openCouponModal,
    closeCouponModal,
    couponList,
    loadingState,
  };
};

export default useCouponModal;
