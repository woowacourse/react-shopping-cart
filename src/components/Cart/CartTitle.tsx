import { WhiteSpace } from "@/style/common.style";
import styled from "@emotion/styled";

interface Props {
  title: string;
  details: string[];
}

const CartTitle = ({ title, details }: Props) => {
  return (
    <StyledTitleWrapper>
      <StyledTitle>{title}</StyledTitle>
      {details.map((detail, idx) => (
        <StyledDetail key={idx}>{detail}</StyledDetail>
      ))}
    </StyledTitleWrapper>
  );
};
export default CartTitle;

const StyledTitleWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledDetail = styled.p`
  font-size: 12px;
`;
