import styled from "@emotion/styled";
import { useCouponContext } from "../../../pages/order-confirm/context/CouponProvider";
import CheckboxLabel from "../CheckboxLabel";
import Flex from "../Flex";
import LabelTextPair, { labelTextPairType } from "./LabelTextPair";
import { Coupon } from "../../../api/coupon";

interface CouponCheckItemProps {
  coupon: Coupon;
  details?: labelTextPairType[];
  disabled?: boolean;
}

function CouponCheckItem({
  coupon,
  details,
  disabled = false,
}: CouponCheckItemProps) {
  const { selectedCoupons, handleCouponToggle } = useCouponContext();
  const [year, month, day] = coupon.expirationDate;

  return (
    <Container
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="sm"
      as={"li"}
      disabled={disabled}
    >
      <CheckboxLabel
        isChecked={selectedCoupons.some(
          (selectedCoupon) => selectedCoupon.id === coupon.id
        )}
        onToggle={() => !disabled && handleCouponToggle(coupon)}
      >
        <CouponTitle>{coupon.description}</CouponTitle>
      </CheckboxLabel>
      <LabelTextPair
        labelTextPairArray={["만료일", `${year}년 ${month}월 ${day}일`]}
      />
      {details &&
        details.map((detail, index) => (
          <LabelTextPair key={index} labelTextPairArray={detail} />
        ))}
    </Container>
  );
}

export default CouponCheckItem;

const Container = styled(Flex)<{ disabled?: boolean }>`
  padding: 14px 0;
  border-bottom: 1px solid #e0e0e0;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const CouponTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: "black";
`;
