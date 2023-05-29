import { Product } from '../../../types/products';
import Flex from '../../common/Flex';
import ItemCartDialogButton from '../ItemCartDialogButton/ItemCartDialogButton';
import * as S from './ProductItem.styles';

type ProductItemProps = Product;

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
        <ItemCartDialogButton {...props} />
      </S.Info>
    </S.Root>
  );
};

export default ProductItem;
