import * as Styled from './styles/TotalCartCount.styles';

interface TotalCartCountProps {
  count: number;
}

export const TotalCartCount = ({ count }: TotalCartCountProps) => {
  return <Styled.Paragraph>{count}</Styled.Paragraph>;
};
