import { useRecoilState } from 'recoil';
import { cartItemListState, cartItemState } from '../../recoil/cartItemList/cartItemListSelector';
import useCartListItem from '../../recoil/cartItemList/useCartListItem';
import Button from '../common/Button/Button';
import ChangeQuantity from '../common/ChangeQuantity/ChangeQuantity';
import Checkbox from '../common/Checkbox/Checkbox';
import { Divider } from '../common/Divider/Divider.style';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import * as S from './CartItem.style';
import useDeleteItem from '../../recoil/cartItemList/useTest';

export type CartItemProps = {
  product: Product;
  quantity: number;
  cartItemId: number;
};

const CartItem = ({ product, quantity, cartItemId }: CartItemProps) => {
  const { productId, name, price, imageUrl, category } = product;
  const { increaseQuantity, decreaseQuantity } = useCartListItem();

  const [cartItem, setCartItem] = useRecoilState(cartItemState(quantity));
  const { deleteCartItem } = useDeleteItem();

  return (
    <S.CartItem>
      <Divider />
      <S.ItemHeader>
        <Checkbox state={true} />
        <Button size="s" radius="s" onClick={() => deleteCartItem(cartItemId)}>
          삭제
        </Button>
      </S.ItemHeader>
      <S.ItemBody>
        <ImageBox width={112} height={112} radius="m" border="lightGray" src={imageUrl} />
        <S.ItemDetail>
          <S.ItemNameAndCost>
            <Text size="m" weight="m">
              {name}
            </Text>
            <Text size="l" weight="l">
              {`${price.toLocaleString('ko-KR')}원`}
            </Text>
          </S.ItemNameAndCost>
          <ChangeQuantity
            quantity={cartItem}
            increaseQuantity={() => {
              increaseQuantity(cartItemId);
              setCartItem(cartItem + 1);
            }}
            decreaseQuantity={() => {
              decreaseQuantity(cartItemId);
              setCartItem(Math.max(cartItem - 1, 0));
            }}
          />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
