import {
  StyledSummaryItem,
  StyledSummaryItemPrice,
  StyledSummaryItemTitle,
} from './SummaryItem.styled';

interface CartSummaryItemProps {
  title: string;
  price: number;
}

export const SummaryItem: React.FC<CartSummaryItemProps> = ({
  title,
  price,
}) => {
  return (
    <StyledSummaryItem>
      <StyledSummaryItemTitle>{title}</StyledSummaryItemTitle>
      <StyledSummaryItemPrice>
        {price.toLocaleString()}원
      </StyledSummaryItemPrice>
    </StyledSummaryItem>
  );
};
