import styled from "styled-components";
import { CouponInstances } from "../../../domain/coupons/AbstractCoupon";
import { FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";
import CheckboxButton from "../../common/Button/CheckboxButton";
import { useRecoilValue } from "recoil";
import { totalCheckedCartItemsPriceState } from "../../../recoil/selectors";

interface CouponCardProps {
  isSelected: boolean;
  couponInstance: CouponInstances;
  onClickCoupon: (couponInstance: CouponInstances) => void;
}

const CouponCard = ({ isSelected, couponInstance, onClickCoupon }: CouponCardProps) => {
  const totalItemPrice = useRecoilValue(totalCheckedCartItemsPriceState);
  const isAvailable = couponInstance.isAvailable(totalItemPrice);

  return (
    <CouponCardContainer>
      <CouponCardWrapper isAvailable={isAvailable}>
        <CouponTitle>
          <CheckboxButton
            id={couponInstance.couponName}
            onClick={() => isAvailable && onClickCoupon(couponInstance)}
            isChecked={isSelected}
          />
          <CouponName htmlFor={couponInstance.couponName}>{couponInstance.couponName}</CouponName>
        </CouponTitle>

        <CouponBody>
          <CouponDescription>{couponInstance.couponExpirationDate}</CouponDescription>
          {couponInstance.minimumAmount && <CouponDescription>{couponInstance.minimumAmount}</CouponDescription>}
          {couponInstance.availableTime && <CouponDescription>{couponInstance.availableTime}</CouponDescription>}
        </CouponBody>
      </CouponCardWrapper>
    </CouponCardContainer>
  );
};

export default CouponCard;

const CouponCardContainer = styled.div`
  max-height: 400px;
  overflow: scroll;
  border-top: 1px solid #0000001a;
`;

const CouponCardWrapper = styled.div<{ isAvailable: boolean }>`
  ${({ isAvailable }) => !isAvailable && "opacity: 0.25"};
`;

const CouponTitle = styled.h3`
  display: flex;
  align-items: center;
  padding-top: 12px;
`;

const CouponName = styled.label`
  font-size: ${FONT_SIZE.medium};
  font-weight: ${FONT_WEIGHT.bold};
  padding-left: 8px;
`;

const CouponBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 24px;
  gap: 4px;
`;

const CouponDescription = styled.p`
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
`;
