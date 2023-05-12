import styled from 'styled-components';

interface TotalCartCountProps {
  count: number;
}

export const TotalCartCount = ({ count }: TotalCartCountProps) => {
  return <StyledParagraph>{count}</StyledParagraph>;
};

const StyledParagraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04c09e;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #ffffff;
  margin-left: 8px;
`;
