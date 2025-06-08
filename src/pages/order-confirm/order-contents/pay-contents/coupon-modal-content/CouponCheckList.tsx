import styled from "@emotion/styled";
import { use, useEffect } from "react";
import { getShoppingCartData } from "../../../../../api/cart";
import { Coupon } from "../../../../../api/coupon";
import CouponCheckItem from "../../../../../components/common/coupon/CouponCheckItem";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../../context/OrderListProvider";
import { useOrderCalculation } from "../../../../../hooks/order/useOrderCalculation";
import { useCouponContext } from "../../../context/CouponProvider";
import { getCouponDetails } from "./utils/getCouponDetails";
import { isCouponAvailable } from "./utils/couponValidation";

function CouponCheckList({
  couponsResource,
}: {
  couponsResource: Promise<Coupon[]>;
}) {
  const coupons = use(couponsResource);
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, isIsland } = useOrderListContext(cartListData);

  const { totalCartPrice, shippingFee } = useOrderCalculation(
    cartListData,
    selectedCartItems,
    isIsland
  );

  const { autoSelectOptimalCoupon } = useCouponContext();

  useEffect(() => {
    if (coupons.length > 0 && selectedCartItems.length > 0) {
      autoSelectOptimalCoupon(
        coupons,
        totalCartPrice,
        shippingFee,
        selectedCartItems
      );
    }
  }, [
    coupons,
    totalCartPrice,
    shippingFee,
    selectedCartItems,
    autoSelectOptimalCoupon,
  ]);

  return (
    <>
      <Container>
        {(coupons ?? []).map((coupon) => {
          const isAvailable = isCouponAvailable(
            coupon,
            totalCartPrice,
            selectedCartItems
          );
          return (
            <CouponCheckItem
              key={coupon.id}
              couponId={coupon.id}
              titleText={coupon.description}
              expiryDate={coupon.expirationDate}
              details={getCouponDetails(coupon)}
              disabled={!isAvailable}
            />
          );
        })}
      </Container>
    </>
  );
}

export default CouponCheckList;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  max-height: 400px;
  overflow: auto;
`;
