import { CartItemProps } from '../../../types';
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

export const OrderItemCard: React.FC<{ item: CartItemProps }> = ({ item }) => {
  return (
    <StyledItemCard>
      <StyledItemCardProductContents>
        <StyledProductImg src={item.product.imageUrl} alt='' />
        <StyledProductInfo>
          <StyledProductName>{item.product.name}</StyledProductName>
          <StyledProductPrice>
            {item.product.price.toLocaleString()}원
          </StyledProductPrice>
          <StyledProductQuantityContainer>
            <StyledProductQuantityText>
              {item.quantity}개
            </StyledProductQuantityText>
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledItemCardProductContents>
    </StyledItemCard>
  );
};
