import * as S from './CartItem.styled';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import DefaultItemIcon from '@assets/icons/default-item.svg';
import CartItemQuantityButton from './Button/Quantity/CartItemQuantityButton';
import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { SyntheticEvent } from 'react';
import { deleteCartItem } from '@/apis/cartItems/deleteCartItem';
import useMutation from '@/shared/hooks/useMutation';

type CartItemProps = {
  cartItem: CartItemType;
  refetchCartItems: () => Promise<void>;
};

export default function CartItem({ cartItem, refetchCartItems }: CartItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;
  const { mutate: removeCartItemMutate } = useMutation(() => deleteCartItem(id));
  const isChecked = true;

  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = DefaultItemIcon;
  };

  const removeCartItem = async () => {
    await removeCartItemMutate(undefined);
    refetchCartItems();
  };

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox isChecked={isChecked} />
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
            refetchCartItems={refetchCartItems}
          />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
