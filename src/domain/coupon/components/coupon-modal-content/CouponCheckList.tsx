import styled from "@emotion/styled";
import { use, useEffect, useRef } from "react";
import { getShoppingCartData } from "../../../../api/cart";
import { Coupon } from "../../../../api/coupon";
import CouponCheckItem from "../../../../components/common/coupon/CouponCheckItem";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../context/OrderListProvider";
import { useOrderCalculation } from "../../../order/hooks/useOrderCalculation";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { getCouponDetails } from "../../utils/getCouponDetails";
import { isCouponAvailable } from "../../utils/couponValidation";
import { useToastContext } from "../../../../context/ToastProvider";

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
  const hasShownToast = useRef(false);

  const { totalCartPrice, shippingFee } = useOrderCalculation(
    selectedCartItems,
    isIsland
  );

  const { initializeCoupons } = useCouponContext();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (!hasShownToast.current) {
      const hasSelectedCoupons = initializeCoupons(
        coupons,
        totalCartPrice,
        shippingFee,
        selectedCartItems
      );

      if (hasSelectedCoupons) {
        showToast("최적의 쿠폰이 자동으로 선택되었습니다.", "info");
        hasShownToast.current = true;
      }
    }
  }, [coupons]);

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
              coupon={coupon}
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
