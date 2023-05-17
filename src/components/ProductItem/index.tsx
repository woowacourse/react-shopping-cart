import useProductSelect from 'src/hooks/useProductSelect';
import { Product } from 'src/types';
import Svg from '../@common/Svg';
import Counter from '../Counter';
import * as S from './ProductItem.styles';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { currentCartItem, decrease, increase, onSelectItem } =
    useProductSelect(product);

  const productSelect = currentCartItem ? (
    <Counter count={currentCartItem.quantity} increase={increase} decrease={decrease} />
  ) : (
    <Svg type="cart-icon" width={25} height={22} onClick={onSelectItem} cursor={"pointer"}/>
  );

  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.price.toLocaleString('KR')} 원
          </S.ProductPrice>
        </div>
        {productSelect}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
