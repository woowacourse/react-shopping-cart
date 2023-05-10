import { Product } from '../../../types/products';
import Flex from '../../common/Flex';
import ItemCartDialog from '../ItemCartDialog/ItemCartDialog';
import * as S from './ProductItem.styles';

interface ProductItemProps extends Product {}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { id, name, price, imageUrl } = props;
  return (
    <S.Root>
      <S.Thumbnail alt={name} src={imageUrl} />
      <S.Info>
        <Flex dir="column">
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString()} 원</S.Price>
        </Flex>
        <ItemCartDialog {...props} />
      </S.Info>
    </S.Root>
  );
};

export default ProductItem;
