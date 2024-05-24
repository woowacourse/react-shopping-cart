import CouponCard from "../CouponCard";
import InfoText from "../../common/InfoText";
import { SHOPPING_MESSAGE } from "../../../constants/messages";
import { CouponInstances } from "../../../domain/coupons/AbstractCoupon";
import styled from "styled-components";

interface CouponListProps {
  selectedCoupons: CouponInstances[];
  coupons: CouponInstances[];
  onClickCoupon: (couponInstance: CouponInstances) => void;
}

const CouponList = ({ selectedCoupons, coupons, onClickCoupon }: CouponListProps) => {
  return (
    <>
      <InfoWrapper>
        <InfoText text={SHOPPING_MESSAGE.couponInfo} />
      </InfoWrapper>
      {coupons.map((couponInstance) => (
        <CouponCard
          key={couponInstance.couponName}
          isSelected={selectedCoupons.includes(couponInstance)}
          couponInstance={couponInstance}
          onClickCoupon={onClickCoupon}
        />
      ))}
    </>
  );
};

export default CouponList;

const InfoWrapper = styled.div`
  padding: 36px 0 16px;
`;
