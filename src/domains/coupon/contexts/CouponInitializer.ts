import { useEffect } from "react";
import { useCoupon } from "../hooks/useCoupon";

const CouponInitializer = () => {
  const { fetchData } = useCoupon();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return null;
};

export default CouponInitializer;
