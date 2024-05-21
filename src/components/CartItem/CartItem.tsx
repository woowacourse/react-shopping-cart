import { useState } from 'react';

import * as S from './CartItem.style';

import Button from '../common/Button/Button';
import ChangeQuantity from '../common/ChangeQuantity/ChangeQuantity';
import Checkbox from '../common/Checkbox/Checkbox';
import Divider from '../common/Divider/Divider';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';

import { useCartItemQuantity } from '../../recoil/cartItem/useCartItemQuantity';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';

export type CartItemProps = {
  type: 'cart' | 'confirm';
  product: Product;
  id: number;
};

const CartItem = ({ type, product, id }: CartItemProps) => {
  const { name, price, imageUrl } = product;
  const { quantity, increaseQuantity, decreaseQuantity } = useCartItemQuantity(id);
  const { isSelected, addSelectedId, removeSelectedId } = useCartItemSelectedIdList();
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
      await increaseQuantity();
    } catch (error) {
      setError(error as Error);
    }
  };

  const decreaseQuantityWithErrorHandling = async () => {
    try {
      await decreaseQuantity();
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
            state={isSelected(id)}
            handleClick={isSelected(id) ? () => removeSelectedId(id) : () => addSelectedId(id)}
          />
          <Button size="s" radius="s" onClick={() => deleteCartItemWithErrorHandling(id)}>
            삭제
          </Button>
        </S.ItemHeader>
      ) : null}
      <S.ItemBody>
        <ImageBox width={112} height={112} radius="m" border="lightGray" src={imageUrl} alt="product-image" />
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
              quantity={quantity}
              increaseQuantity={increaseQuantityWithErrorHandling}
              decreaseQuantity={decreaseQuantityWithErrorHandling}
            />
          ) : (
            <Text size="s" weight="m">
              {`${quantity}개`}
            </Text>
          )}
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
