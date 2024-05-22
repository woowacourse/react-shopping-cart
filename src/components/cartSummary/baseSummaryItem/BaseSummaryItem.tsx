import {
  StyledBaseSummaryItem,
  StyledBaseSummaryItemPrice,
  StyledBaseSummaryItemTitle,
} from "./BaseSummaryItem.styled";

interface BaseSummaryItemProps {
  title: string;
  price: number;
}

export const BaseSummaryItem: React.FC<BaseSummaryItemProps> = ({ title, price }) => {
  return (
    <StyledBaseSummaryItem>
      <StyledBaseSummaryItemTitle>{title}</StyledBaseSummaryItemTitle>
      <StyledBaseSummaryItemPrice>{price.toLocaleString()}원</StyledBaseSummaryItemPrice>
    </StyledBaseSummaryItem>
  );
};
