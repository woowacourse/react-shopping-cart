import {
  StyledItemCard,
  StyledItemCardProductContents,
  StyledProductImg,
  StyledProductInfo,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from '../ItemCard.styled';
import { selectedItems } from '../../../types';

interface OrderItemCardProps {
  item: selectedItems;
}
export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  item: { imageUrl, name, price, quantity },
}) => {
  return (
    <StyledItemCard>
      <StyledItemCardProductContents>
        <StyledProductImg src={imageUrl} alt='' />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price.toLocaleString()}원</StyledProductPrice>
          <StyledProductQuantityContainer>
            <StyledProductQuantityText>{quantity}개</StyledProductQuantityText>
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledItemCardProductContents>
    </StyledItemCard>
  );
};
