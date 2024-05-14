import Button from '../common/Button/Button';
import ChangeQuantity from '../common/ChangeQuantity/ChangeQuantity';
import Checkbox from '../common/Checkbox/Checkbox';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import * as S from './CartItem.style';

type CartItemProps = {
  imgUrl: string;
  id: number;
  productName: string;
  productPrice: string;
  quantity: number;
};

const CartItem = ({ imgUrl, id, productName, productPrice, quantity }: CartItemProps) => {
  return (
    <S.CartItem>
      <S.ItemHeader>
        <Checkbox state={true} />
        <Button size="s" radius="s">
          삭제
        </Button>
      </S.ItemHeader>
      <S.ItemBody>
        <ImageBox
          width={100}
          height={100}
          radius="m"
          border="lightGray"
          src="https://velog.velcdn.com/images/pakxe/post/fbea0923-dc6e-4867-8469-5b7ec7b4d84d/image.jpg"
        />
        <S.ItemDetail>
          <S.ItemNameAndCost>
            <Text size="m" weight="m">
              상품이름 A
            </Text>
            <Text size="l" weight="l">
              35,000원
            </Text>
          </S.ItemNameAndCost>
          <ChangeQuantity quantity={1} />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
