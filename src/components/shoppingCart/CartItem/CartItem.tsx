import { useRecoilValue } from 'recoil';

import { CheckBox, DeleteItemButton } from '../../common';
import { QuantityController } from '../';
import * as Styled from './CartItem.style';

import { useCheckCartItem } from '../../../hooks';
import { convertToLocaleAmount } from '../../../utils';
import { Product, QuantityControlType } from '../../../type';
import { itemQuantityState } from '../../../recoil/atoms';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
  onDelete: (cartItemId: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  onUpdateQuantity,
  onDelete,
}: CartItemProps) {
  const itemQuantity = useRecoilValue(itemQuantityState(cartItemId));
  const { isChecked, onCheckCartItem } = useCheckCartItem();

  const toggleCheckBox = () => {
    onCheckCartItem(cartItemId, !isChecked(cartItemId));
  };

  const handleChangeQuantity = async (type: QuantityControlType) => {
    const newQuantity = type === 'increase' ? itemQuantity + 1 : Math.max(1, itemQuantity - 1);
    onUpdateQuantity(cartItemId, newQuantity);
  };

  const handleClickDeleteButton = () => {
    onDelete(cartItemId);
  };

  return (
    <Styled.CartItemContainer>
      <Styled.CartItemHeader>
        <CheckBox
          itemId={cartItemId}
          isChecked={isChecked(cartItemId)}
          onChange={toggleCheckBox}
          data-testid="cart-item-checkbox"
        />
        <DeleteItemButton type="button" buttonText="삭제" onClick={handleClickDeleteButton} />
      </Styled.CartItemHeader>
      <Styled.CartItemContent>
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
      </Styled.CartItemContent>
    </Styled.CartItemContainer>
  );
}
