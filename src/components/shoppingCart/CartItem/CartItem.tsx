import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CheckBox, DeleteItemButton } from '../../common';
import { QuantityController } from '../';
import * as Styled from './CartItem.style';

import { useCheckCartItem, useFetchError } from '../../../hooks';
import { updateCartItemQuantity } from '../../../apis';
import { convertToLocaleAmount } from '../../../utils';
import { Product, QuantityControlType } from '../../../type';
import { itemQuantityState } from '../../../recoil/atoms';
import { ERROR_MESSAGE } from '../../../apis/fetchData/errorMessage';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  onDelete: (cartItemId: number) => void;
}

export default function CartItem({ cartItemId, product, quantity, onDelete }: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));
  const { isChecked, onCheckCartItem } = useCheckCartItem();
  const { throwFetchError, resetFetchError } = useFetchError();

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const toggleCheckBox = () => {
    onCheckCartItem(cartItemId, !isChecked(cartItemId));
  };

  const handleChangeQuantity = async (type: QuantityControlType) => {
    const newQuantity = type === 'increase' ? itemQuantity + 1 : Math.max(1, itemQuantity - 1);
    setItemQuantity(newQuantity);
    await updateQuantity(cartItemId, newQuantity);
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      resetFetchError();
    } catch (error) {
      throwFetchError(error, ERROR_MESSAGE.UPDATE_QUANTITY_FAILED);
    }
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
