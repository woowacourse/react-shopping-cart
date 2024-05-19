import {
  StyledCartSummaryItem,
  StyledSummaryItemPrice,
  StyledSummaryItemTitle,
} from "./CartSummaryItem.styled";

interface CartSummaryItemProps {
  title: string;
  price: number;
}

export const CartSummaryItem: React.FC<CartSummaryItemProps> = ({ title, price }) => {
  return (
    <StyledCartSummaryItem>
      <StyledSummaryItemTitle>{title}</StyledSummaryItemTitle>
      <StyledSummaryItemPrice>{price.toLocaleString()}원</StyledSummaryItemPrice>
    </StyledCartSummaryItem>
  );
};
