import styled from 'styled-components';

interface TotalCartCountProps {
  count: number;
}

export const TotalCartCount = ({ count }: TotalCartCountProps) => {
  return <StyledTotalCartCount>{count}</StyledTotalCartCount>;
};

const StyledTotalCartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--count-color);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: var(--white-color);
  margin-left: 8px;
`;
