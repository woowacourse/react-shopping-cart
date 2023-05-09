import SHOPPING_CART from '../../../assets/png/cart-icon.png';
import Flex from '../../common/Flex';
import * as S from './ProductItem.styles';

interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductItemProps extends Item {}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { name, price, imageUrl } = props;
  return (
    <S.Root>
      <S.Thumbnail alt={name} src={imageUrl} />
      <S.Info>
        <Flex dir="column">
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString()} 원</S.Price>
        </Flex>
        <S.CartButton>
          <S.CartImg alt="cart" src={SHOPPING_CART} />
        </S.CartButton>
      </S.Info>
    </S.Root>
  );
};

export default ProductItem;
