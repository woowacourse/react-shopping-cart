import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';
import { MinusButton, PlusButton } from '../Button/QuantityButton';

import BorderButton from '../Button/BorderButton';
import CheckBox from '../Button/CheckBoxButton';
import { Product } from '@/types/product.type';
import styled from '@emotion/styled';

interface Props {
  product: Product;
  quantity: number;
  isSelected: boolean;
  handleSelected: () => void;
  handleDelete: () => void;
  handleQuantity: (quantity: number) => void;
}

const CartItem = ({
  product,
  quantity,
  isSelected,
  handleSelected,
  handleDelete,
  handleQuantity,
}: Props) => {
  return (
    <StyledItemWrapper>
      <StyledFlexBetweenBox>
        <CheckBox isSelected={isSelected} onClick={handleSelected} />
        <BorderButton onClick={handleDelete}>삭제</BorderButton>
      </StyledFlexBetweenBox>
      <StyledRowBox>
        <StyledImg src={product.imageUrl} alt={product.name} />
        <StyledColumnBox>
          <StyledItemName>{product.name}</StyledItemName>
          <StyledItemPrice>
            {product.price.toLocaleString('ko-KR')}원
          </StyledItemPrice>
          <StyledQuantityBox>
            <MinusButton onClick={() => handleQuantity(quantity - 1)} />
            {quantity}
            <PlusButton onClick={() => handleQuantity(quantity + 1)} />
          </StyledQuantityBox>
        </StyledColumnBox>
      </StyledRowBox>
    </StyledItemWrapper>
  );
};
export default CartItem;

const StyledItemWrapper = styled.div`
  ${FlexColumn}
  justify-content: space-around;
  width: 100%;
  height: 160px;
  margin-top: 10px;
  border-top: 1px solid #bebebe;
  padding: 10px 0;
`;

const StyledFlexBetweenBox = styled.div`
  ${FlexSpaceBetween}
  align-items: center;
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
  font-size: 14px;
`;

const StyledItemPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const StyledQuantityBox = styled.div`
  ${FlexRow}
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
