import fetchCoupons from "../../apis/fetchCoupons";
import useFetchData from "../useFetchData";

const useCoupons = () => {
  const { data: coupons } = useFetchData({
    fetcher: fetchCoupons,
  });

  return {
    coupons,
  };
};

export default useCoupons;
