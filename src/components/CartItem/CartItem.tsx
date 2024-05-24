import { useState } from 'react';

import * as S from './CartItem.style';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';
import Divider from '../common/Divider/Divider';
import Checkbox from '../common/Checkbox/Checkbox';
import ImageBox from '../common/ImageBox/ImageBox';
import useCartItemList from '../../hooks/cartItem/useCartItemList';
import ChangeQuantity from '../common/ChangeQuantity/ChangeQuantity';
import { useCartItemQuantity } from '../../hooks/cartItem/useCartItemQuantity';
import { useSelectedCartItemId } from '../../hooks/cartItem/useSelectedCartItemId';

export type CartItemProps = {
  type: 'cart' | 'confirm';
  cartItem: CartItem;
};

const CartItem = ({ type, cartItem }: CartItemProps) => {
  const { id, name, price, imageUrl } = cartItem;
  const { cartItemQuantity, increaseQuantity, decreaseQuantity } =
    useCartItemQuantity();
  const { isSelectedId, selectCartItem, unselectCartItem } =
    useSelectedCartItemId();
  const { deleteCartItem } = useCartItemList();
  const [error, setError] = useState<Error | null>(null);

  const deleteCartItemWithErrorHandling = async (id: number) => {
    try {
      await deleteCartItem(id);
    } catch (error) {
      setError(error as Error);
    }
  };

  const increaseQuantityWithErrorHandling = async () => {
    try {
      await increaseQuantity(id);
    } catch (error) {
      setError(error as Error);
    }
  };

  const decreaseQuantityWithErrorHandling = async () => {
    try {
      await decreaseQuantity(id);
    } catch (error) {
      setError(error as Error);
    }
  };

  if (error) {
    throw error;
  }

  return (
    <S.CartItem>
      <Divider />
      {type === 'cart' ? (
        <S.ItemHeader>
          <Checkbox
            state={isSelectedId(id)}
            handleClick={
              isSelectedId(id)
                ? () => unselectCartItem(id)
                : () => selectCartItem(id)
            }
          />
          <Button
            size="s"
            radius="s"
            onClick={() => deleteCartItemWithErrorHandling(id)}
          >
            삭제
          </Button>
        </S.ItemHeader>
      ) : null}
      <S.ItemBody>
        <ImageBox
          width={112}
          height={112}
          radius="m"
          border="lightGray"
          src={imageUrl}
          alt="상품 이미지"
        />
        <S.ItemDetail>
          <S.ItemNameAndCost>
            <Text size="s" weight="m">
              {name}
            </Text>
            <Text size="l" weight="l">
              {`${price.toLocaleString('ko-KR')}원`}
            </Text>
          </S.ItemNameAndCost>
          {type === 'cart' ? (
            <ChangeQuantity
              quantity={cartItemQuantity(id)}
              increaseQuantity={increaseQuantityWithErrorHandling}
              decreaseQuantity={decreaseQuantityWithErrorHandling}
            />
          ) : (
            <Text size="s" weight="m">
              {`${cartItemQuantity(id)}개`}
            </Text>
          )}
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
