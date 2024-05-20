import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CheckBox, DeleteItemButton } from '../../common';
import { QuantityController } from '../';
import * as Styled from './CartItem.style';

import { convertToLocaleAmount } from '../../../utils';
import { useCheckCartItem } from '../../../hooks';
import { itemQuantityState } from '../../../recoil/atoms';
import { Product, QuantityControlType } from '../../../type';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  onDelete: (cartItemId: number) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  quantity,
  onDelete,
  onUpdateQuantity,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));
  const { isChecked, onCheckCartItem } = useCheckCartItem();

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const toggleCheckBox = () => {
    onCheckCartItem(cartItemId, !isChecked(cartItemId));
  };

  const handleChangeQuantity = (type: QuantityControlType) => {
    const newQuantity = type === 'increase' ? itemQuantity + 1 : Math.max(1, itemQuantity - 1);
    setItemQuantity(newQuantity);
    onUpdateQuantity(cartItemId, newQuantity);
  };

  const handleClickDeleteButton = () => {
    onDelete(cartItemId);
  };

  return (
    <Styled.CartItemContainer>
      <Styled.CardItemHeader>
        <CheckBox
          isChecked={isChecked(cartItemId)}
          onClick={toggleCheckBox}
          data-testid="cart-item-checkbox"
        />
        <DeleteItemButton type="button" buttonText="삭제" onClick={handleClickDeleteButton} />
      </Styled.CardItemHeader>
      <Styled.CardItemContent>
        <Styled.ProductImageBox src={product.imageUrl} alt={product.name} />
        <Styled.ProductInfoBox>
          <div>
            <Styled.ProductName>{product.name}</Styled.ProductName>
            <Styled.ProductPrice>{convertToLocaleAmount(product.price)}</Styled.ProductPrice>
          </div>
          <QuantityController
            quantity={itemQuantity}
            minQuantity={1}
            maxQuantity={100}
            onChangeQuantity={(type: QuantityControlType) => handleChangeQuantity(type)}
          />
        </Styled.ProductInfoBox>
      </Styled.CardItemContent>
    </Styled.CartItemContainer>
  );
}
