import { useEffect } from 'react';
import { useCartItemQuantity } from '../../recoil/cartItem/useCartItemQuantity';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';
import Button from '../common/Button/Button';
import ChangeQuantity from '../common/ChangeQuantity/ChangeQuantity';
import Checkbox from '../common/Checkbox/Checkbox';
import { Divider } from '../common/Divider/Divider.style';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import * as S from './CartItem.style';

export type CartItemProps = {
  product: Product;
  quantity: number;
  cartItemId: number;
};

const CartItem = ({ product, quantity: initialQuantity, cartItemId }: CartItemProps) => {
  const { productId, name, price, imageUrl, category } = product;
  const { quantity, updateQuantity, increaseQuantity, decreaseQuantity } = useCartItemQuantity(cartItemId);
  const { getIsSelected, addSelectedId, removeSelectedId } = useCartItemSelectedIdList();
  const { deleteCartItem } = useCartItemList();

  useEffect(() => {
    updateQuantity(initialQuantity);
  }, []);

  return (
    <S.CartItem>
      <Divider />
      <S.ItemHeader>
        <Checkbox
          state={getIsSelected(cartItemId)}
          handleClick={getIsSelected(cartItemId) ? () => removeSelectedId(cartItemId) : () => addSelectedId(cartItemId)}
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

export default CartItem;
