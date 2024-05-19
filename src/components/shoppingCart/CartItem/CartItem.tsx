import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CheckBox, DeleteItemButton } from '../../common';
import { QuantityController } from '../';
import * as Styled from './CartItem.style';

import { convertToLocaleAmount } from '../../../utils';
import { useCheckedItemIds } from '../../../hooks';
import { itemQuantityState } from '../../../recoil/atoms';
import { Product } from '../../../type';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  handleDelete: (cartItemId: number) => void;
  handleIncreaseQuantity: (cartItemId: number, quantity: number) => void;
  handleDecreaseQuantity: (cartItemId: number, quantity: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  quantity,
  handleDelete,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));
  const { getIsChecked, checkId, uncheckId } = useCheckedItemIds();

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const handleClickCheckBox = () => {
    getIsChecked(cartItemId) ? uncheckId(cartItemId) : checkId(cartItemId);
  };

  const handleClickIncreaseQuantity = () => {
    const quantity = itemQuantity + 1;
    setItemQuantity(quantity);
    handleIncreaseQuantity(cartItemId, quantity);
  };

  const handleClickDecreaseQuantity = () => {
    const quantity = Math.max(1, itemQuantity - 1);
    setItemQuantity(quantity);
    handleDecreaseQuantity(cartItemId, quantity);
  };

  const handleClickDeleteButton = () => {
    handleDelete(cartItemId);
  };

  return (
    <Styled.CartItemContainer>
      <Styled.CardItemHeader>
        <CheckBox isChecked={getIsChecked(cartItemId)} onClick={handleClickCheckBox} />
        <DeleteItemButton buttonText="삭제" onClick={handleClickDeleteButton} />
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
            handleIncreaseQuantity={handleClickIncreaseQuantity}
            handleDecreaseQuantity={handleClickDecreaseQuantity}
          />
        </Styled.ProductInfoBox>
      </Styled.CardItemContent>
    </Styled.CartItemContainer>
  );
}
