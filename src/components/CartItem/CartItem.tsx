import * as S from './CartItem.style';
import Divider from '../common/Divider/Divider';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import type { CartItem } from '../../types/cartItem.type';

const CartItem = ({ product, quantity }: CartItem) => {
  const { name, price, imageUrl } = product;

  return (
    <S.CartItem>
      <Divider />

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
          <Text size="s" weight="s">
            {quantity}개
          </Text>
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
