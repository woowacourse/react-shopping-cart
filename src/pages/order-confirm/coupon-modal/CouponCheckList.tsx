import styled from "@emotion/styled";
import CouponCheckItem from "../../../components/common/coupon/CouponCheckItem";
import { use } from "react";
import { getCouponDetails } from "./utils/getCouponDetails";
import { Coupon } from "../../../api/coupon";

function CouponCheckList({
  couponsResource,
}: {
  couponsResource: Promise<Coupon[]>;
}) {
  const coupons = use(couponsResource);

  return (
    <Container>
      {(coupons ?? []).map((coupon) => {
        return (
          <CouponCheckItem
            key={coupon.id}
            titleText={coupon.description}
            expiryDate={coupon.expirationDate}
            details={getCouponDetails(coupon)}
          />
        );
      })}
    </Container>
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
