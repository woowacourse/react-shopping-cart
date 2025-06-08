import { getCoupon } from "@/apis/coupon/getCoupon";
import useFetchData from "@/shared/hooks/useFetchData";

/**
 * 쿠폰 목록을 가져오는(GET API) 커스텀 훅
 *
 * @returns {{
 *   couponList: Coupon[],
 *   isLoading: boolean,
 *   errorMessage: string | null
 * }}
 * @property {Coupon[]} couponList - 조회된 쿠폰 목록 (기본값: 빈 배열)
 * @property {boolean} isLoading - 데이터 로딩 상태
 * @property {string | null} errorMessage - 에러 발생 시 메시지
 */
export const useGetCoupon = () => {
  const {
    data: couponList,
    isLoading,
    errorMessage,
  } = useFetchData({ fetchFn: getCoupon });

  return {
    couponList: couponList ?? [],
    isLoading,
    errorMessage,
  };
};
