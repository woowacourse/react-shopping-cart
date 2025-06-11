import * as S from './CartItem.styled';
import CheckBox from '@/shared/ui/CheckBox';
import DefaultItemIcon from '@assets/icons/default-item.svg';
import CartItemQuantityButton from './Button/Quantity/CartItemQuantityButton';
import { CartItemType, useCartContext } from '@entities/cart';
import { SyntheticEvent } from 'react';

interface CartItemProps {
  cartItem: CartItemType;
  isChecked: boolean;
  addOrderItemId: (id: number) => void;
  removeOrderItemId: (id: number) => void;
}

export default function CartItem({
  cartItem,
  isChecked,
  addOrderItemId,
  removeOrderItemId,
}: CartItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;
  const { removeItem } = useCartContext();

  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = DefaultItemIcon;
  };

  const removeCartItem = async () => {
    await removeItem(id);
    removeOrderItemId(id);
  };

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeOrderItemId(id);
      return;
    }

    addOrderItemId(id);
  };

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox isChecked={isChecked} onClick={handleCheckBoxClick} aria-label="상품 선택" />
        <S.DeleteButton type="button" onClick={removeCartItem}>
          삭제
        </S.DeleteButton>
      </S.ItemHeader>

      <S.ItemContent>
        <S.ItemImage
          src={imageUrl ?? DefaultItemIcon}
          alt={`${name} 상품`}
          onError={imageLoadError}
        />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <CartItemQuantityButton
            cartItemId={id}
            quantity={quantity}
            removeOrderItemId={removeOrderItemId}
          />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
