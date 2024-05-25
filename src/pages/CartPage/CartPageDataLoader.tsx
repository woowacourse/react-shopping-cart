import MainLayout from "@/components/layout/MainLayout.tsx";
import { HEADER_TITLES } from "@/constants/titleAndCaption.ts";
import CartPageSkeleton from "@/pages/CartPage/CartPage.skeleton.tsx";
import CartPage from "@/pages/CartPage/CartPage.tsx";
import { useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import { couponsState } from "@/recoil/coupons.ts";
import { shippingFeeState } from "@/recoil/shippingFeeType.ts";

const CartPageDataLoader = () => {
  const resetCoupons = useResetRecoilState(couponsState);
  const resetShippingFee = useResetRecoilState(shippingFeeState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    resetCoupons();
    resetShippingFee();
    setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      <MainLayout.TitleHeader text={HEADER_TITLES.shop} />
      <MainLayout.Body fallback={<CartPageSkeleton />}>
        {!isLoading ? <CartPage /> : <CartPageSkeleton />}
      </MainLayout.Body>
    </MainLayout>
  );
};
export default CartPageDataLoader;
