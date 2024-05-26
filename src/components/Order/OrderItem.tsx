import { FlexColumn, FlexRow } from '@/style/common.style';

import { CartItemType } from '@/types/cart.type';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  item: CartItemType;
}

const OrderItem = ({ item }: Props) => {
  const { quantity, product } = item;

  return (
    <StyledItemWrapper>
      <StyledRowBox>
        <StyledImg src={product.imageUrl} alt={product.name} />
        <StyledColumnBox>
          <StyledItemName>{product.name}</StyledItemName>
          <StyledItemPrice>
            {product.price.toLocaleString('ko-KR')}원
          </StyledItemPrice>
          <StyledQuantityBox>{quantity}개</StyledQuantityBox>
        </StyledColumnBox>
      </StyledRowBox>
    </StyledItemWrapper>
  );
};
export default OrderItem;

const StyledItemWrapper = styled.div`
  ${FlexColumn}
  justify-content: space-around;
  width: 100%;
  height: 140px;
  border-top: 1px solid ${theme.color.blackWithOpacity};
`;

const StyledRowBox = styled.div`
  ${FlexRow}
  gap: 20px;
`;

const StyledColumnBox = styled.div`
  ${FlexColumn}
  gap: 5px;
  margin-top: 10px;
`;

const StyledImg = styled.img`
  width: 112px;
  height: 112px;

  border-radius: 8px;
`;

const StyledItemName = styled.span`
  font-size: ${theme.fontSize.small};
`;

const StyledItemPrice = styled.span`
  font-size: ${theme.fontSize.large};
  font-weight: ${theme.fontWeight.bold};
`;

const StyledQuantityBox = styled.div`
  margin-top: 20px;
  font-size: ${theme.fontSize.small};
`;
