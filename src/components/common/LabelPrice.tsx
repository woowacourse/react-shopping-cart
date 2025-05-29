import styled from "@emotion/styled";
import Flex from "./Flex";

interface LabelPriceProps {
  label: string;
  price: number;
  ariaLabel?: string;
}

const LabelPrice = ({ label, price, ariaLabel }: LabelPriceProps) => {
  return (
    <TotalSection>
      <TotalLabel>{label}</TotalLabel>
      <TotalAmount aria-label={ariaLabel}>
        {price.toLocaleString()}원
      </TotalAmount>
    </TotalSection>
  );
};

export default LabelPrice;

const TotalSection = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const TotalAmount = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
