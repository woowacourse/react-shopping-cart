import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';
import { MinusButton, PlusButton } from '../Button/QuantityButton';
import { getCartItems, patchCartItem } from '@/api/cartItem';
import { useEffect, useState } from 'react';

import BorderButton from '../Button/BorderButton';
import { CartItemType } from '@/types/cart.type';
import CheckBox from '../Button/CheckBoxButton';
import { cartItemState } from '@/store/atoms';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

interface Props {
  item: CartItemType;
  handleDelete: (id: number) => void;
}

const CartItem = ({ item, handleDelete }: Props) => {
  const { id, quantity, product } = item;

  const [itemState, setItemState] = useRecoilState(cartItemState(item.id));
  // const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setItemState({
      id,
      quantity,
      price: item.product.price,
      isSelected: itemState.isSelected,
    });
  }, []);

  const handleSelect = () => {
    const newValue = { ...itemState };
    newValue.isSelected = !newValue.isSelected;
    setItemState(newValue);
  };

  const handleQuantity = (quantity: number) => {
    try {
      const patchData = async () => {
        await patchCartItem(id, quantity);

        const cartItemsData = await getCartItems();
        const newData = cartItemsData.find((item) => item.id === id) || item;
        const newValue = { ...itemState };
        newValue.quantity = newData?.quantity;

        setItemState(newValue);
      };

      patchData();
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <StyledItemWrapper>
      <StyledFlexBetweenBox>
        <CheckBox isSelected={itemState.isSelected} onClick={handleSelect} />
        <BorderButton onClick={() => handleDelete(id)}>삭제</BorderButton>
      </StyledFlexBetweenBox>
      <StyledRowBox>
        <StyledImg src={product.imageUrl} alt={product.name} />
        <StyledColumnBox>
          <StyledItemName>{product.name}</StyledItemName>
          <StyledItemPrice>
            {product.price.toLocaleString('ko-KR')}원
          </StyledItemPrice>
          <StyledQuantityBox>
            <MinusButton
              onClick={() => handleQuantity(itemState.quantity - 1)}
            />
            {itemState.quantity}
            <PlusButton
              onClick={() => handleQuantity(itemState.quantity + 1)}
            />
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
