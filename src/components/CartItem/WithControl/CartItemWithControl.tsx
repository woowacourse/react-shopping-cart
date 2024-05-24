import { useEffect } from 'react';

import * as S from '../CartItem.style';

import Button from '../../common/Button/Button';
import ChangeQuantity from '../../common/ChangeQuantity/ChangeQuantity';
import Checkbox from '../../common/Checkbox/Checkbox';
import Divider from '../../common/Divider/Divider';
import ImageBox from '../../common/ImageBox/ImageBox';
import Text from '../../common/Text/Text';

import type { CartItem as CartItemWithControl } from '../../../types/cartItem.type';
import { useCartItemQuantity } from '../../../recoil/cartItem/useCartItemQuantity';
import { useSelectedCartItemIdList } from '../../../recoil/selectedCartItemList/useSelectedCartItemIdList';
import { useCartItemList } from '../../../recoil/cartItemList/useCartItemList';

const CartItemWithControl = ({ product, quantity: initialQuantity, cartItemId }: CartItemWithControl) => {
  const { name, price, imageUrl } = product;
  const { quantity, setQuantity, increaseQuantity, decreaseQuantity } = useCartItemQuantity(cartItemId);
  const { getIsSelectedCartItem, addSelectedItemId, deleteSelectedItemId } = useSelectedCartItemIdList();
  const { deleteCartItem } = useCartItemList();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, []);

  return (
    <S.CartItem>
      <Divider />
      <S.ItemHeader>
        <Checkbox
          checked={getIsSelectedCartItem(cartItemId)}
          handleClick={
            getIsSelectedCartItem(cartItemId)
              ? () => deleteSelectedItemId(cartItemId)
              : () => addSelectedItemId(cartItemId)
          }
          alt="Checkbox"
        />
        <Button size="s" radius="s" onClick={() => deleteCartItem(cartItemId)}>
          삭제
        </Button>
      </S.ItemHeader>
      <S.ItemBody>
        <ImageBox width={112} height={112} radius="m" border="lightGray" src={imageUrl} />
        <S.ItemDetail>
          <S.ItemNameAndCost>
            <Text size="s" weight="m">
              {name}
            </Text>
            <Text size="l" weight="l">
              {`${price.toLocaleString('ko-KR')}원`}
            </Text>
          </S.ItemNameAndCost>
          <ChangeQuantity quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItemWithControl;
