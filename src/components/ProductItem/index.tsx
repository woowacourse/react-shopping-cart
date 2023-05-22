import useCartUpdate from 'src/hooks/useCartUpdate';
import { Product } from 'src/types';
import Svg from '../@common/Svg';
import Counter from '../@common/Counter';
import * as S from './ProductItem.styles';
import { convertKORWon } from 'src/utils';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { currentCartItem, productCountMethod, onSelectItem } =
    useCartUpdate(product);

  const productSelect = currentCartItem ? (
    <Counter
      count={currentCartItem.quantity}
      productCountMethod={productCountMethod}
    />
  ) : (
    <Svg
      type="cart-icon"
      width={25}
      height={22}
      onClick={onSelectItem}
      cursor={'pointer'}
    />
  );

  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{convertKORWon(product.price)} </S.ProductPrice>
        </div>
        {productSelect}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
