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
import useApiErrorState from '../../hooks/error/useApiErrorState';

export type CartItemProps = {
  type?: 'cart' | 'confirm';
  cartItem: CartItem;
};

const CartItem = ({ type = 'cart', cartItem }: CartItemProps) => {
  const { id, name, price, imageUrl } = cartItem;
  const { apiError } = useApiErrorState();
  const { cartItemQuantity, increaseQuantity, decreaseQuantity } =
    useCartItemQuantity();
  const { isSelectedId, selectCartItem, unselectCartItem } =
    useSelectedCartItemId();
  const { deleteCartItem } = useCartItemList();

  if (
    apiError?.name === 'FailedDeleteCartItemError' ||
    apiError?.name === 'FailedSetCartItemQuantityError'
  ) {
    throw apiError;
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
          <Button size="s" radius="s" onClick={() => deleteCartItem(id)}>
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
              increaseQuantity={() => increaseQuantity(id)}
              decreaseQuantity={() => decreaseQuantity(id)}
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
