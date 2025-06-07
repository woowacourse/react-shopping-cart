import { CouponApi } from "@/apis";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules/Query";

export default function useCouponQuery() {
  return useQuery({
    queryFn: CouponApi.getAllCoupons,
    queryKey: QUERY_KEY.coupon,
    initialData: [],
  });
}
