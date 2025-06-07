import styled from "@emotion/styled";
import CheckboxLabel from "../CheckboxLabel";
import Flex from "../Flex";
import LabelTextPair, { labelTextPairType } from "./LabelTextPair";

type ExpiryDateTuple = [Year, Month, Day];

interface CouponCheckItemProps {
  isChecked: boolean;
  onToggle: () => void;
  expiryDate: ExpiryDateTuple;
  titleText: string;
  details?: labelTextPairType[];
}

function CouponCheckItem({
  isChecked,
  onToggle,
  expiryDate,
  titleText,
  details,
}: CouponCheckItemProps) {
  const [year, month, day] = expiryDate;
  return (
    <Container
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="sm"
      as={"li"}
    >
      <CheckboxLabel isChecked={isChecked} onToggle={onToggle}>
        <CouponTitle>{titleText}</CouponTitle>
      </CheckboxLabel>
      <LabelTextPair
        labelTextPairArray={["만료일", `20${year}년 ${month}월 ${day}일`]}
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

type Year = number;
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Day =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
