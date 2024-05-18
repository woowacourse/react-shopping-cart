import { useEffect, useState } from 'react';

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
  product: Product;
  quantity: number;
  cartItemId: number;
};

const CartItem = ({ product, quantity: initialQuantity, cartItemId }: CartItemProps) => {
  const { name, price, imageUrl } = product;
  const { quantity, setQuantity, increaseQuantity, decreaseQuantity } = useCartItemQuantity(cartItemId);
  const { getIsSelected, addSelectedId, removeSelectedId } = useCartItemSelectedIdList();
  const { deleteCartItem } = useCartItemList();
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setQuantity(initialQuantity);
  }, []);

  const deleteCartItemWithErrorHandling = async (cartItemId: number) => {
    try {
      await deleteCartItem(cartItemId)
    } catch (error) {
      setError(error as Error);
    }
  }

  const increaseQuantityWithErrorHandling = async () => {
    try {
      await increaseQuantity();
    } catch (error) {
      setError(error as Error);
    }
  }

  const decreaseQuantityWithErrorHandling = async () => {
    try {
      await decreaseQuantity();
    } catch (error) {
      setError(error as Error);
    }
  }

  if (error) {
    throw error;
  }

  return (
    <S.CartItem>
      <Divider />
      <S.ItemHeader>
        <Checkbox
          state={getIsSelected(cartItemId)}
          handleClick={getIsSelected(cartItemId) ? () => removeSelectedId(cartItemId) : () => addSelectedId(cartItemId)}
        />
        <Button size="s" radius="s" onClick={() => deleteCartItemWithErrorHandling(cartItemId)}>
          삭제
        </Button>
      </S.ItemHeader>
      <S.ItemBody>
        <ImageBox width={112} height={112} radius="m" border="lightGray" src={imageUrl} alt='product-image' />
        <S.ItemDetail>
          <S.ItemNameAndCost>
            <Text size="s" weight="m">
              {name}
            </Text>
            <Text size="l" weight="l">
              {`${price.toLocaleString('ko-KR')}원`}
            </Text>
          </S.ItemNameAndCost>
          <ChangeQuantity quantity={quantity} increaseQuantity={increaseQuantityWithErrorHandling} decreaseQuantity={decreaseQuantityWithErrorHandling} />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
