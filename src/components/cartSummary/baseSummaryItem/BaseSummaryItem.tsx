import { formatPrice } from "../../../utils/formatPrice";
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
      <StyledBaseSummaryItemPrice>{formatPrice(price)}원</StyledBaseSummaryItemPrice>
    </StyledBaseSummaryItem>
  );
};
