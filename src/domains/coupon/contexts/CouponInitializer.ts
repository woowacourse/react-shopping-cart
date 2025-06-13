import { useEffect } from "react";
import { useCouponSelector } from "../hooks/useCoupon";

const CouponInitializer = () => {
  const fetchData = useCouponSelector((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return null;
};

export default CouponInitializer;
