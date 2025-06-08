import styled from "@emotion/styled";
import { useCouponContext } from "../../../pages/order-confirm/context/CouponProvider";
import CheckboxLabel from "../CheckboxLabel";
import Flex from "../Flex";
import LabelTextPair, { labelTextPairType } from "./LabelTextPair";

interface CouponCheckItemProps {
  couponId: string;
  expiryDate: [number, number, number];
  titleText: string;
  details?: labelTextPairType[];
}

function CouponCheckItem({
  couponId,
  expiryDate,
  titleText,
  details,
}: CouponCheckItemProps) {
  const { selectedCoupon, handleCouponToggle } = useCouponContext();
  const [year, month, day] = expiryDate;
  return (
    <Container
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="sm"
      as={"li"}
    >
      <CheckboxLabel
        isChecked={selectedCoupon.includes(couponId)}
        onToggle={() => handleCouponToggle(couponId)}
      >
        <CouponTitle>{titleText}</CouponTitle>
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

const Container = styled(Flex)`
  padding: 14px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const CouponTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;
