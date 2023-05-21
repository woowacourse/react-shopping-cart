import * as S from './ProductItem.styles';
import Svg from 'components/@common/Svg';
import Counter from 'components/@common/Counter';
import { useProductSelect } from 'hooks/useProductSelect';
import { Product } from 'types';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { currentCartItem, remove, add, onSelectItem } =
    useProductSelect(product);

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
        {currentCartItem ? (
          <Counter
            count={currentCartItem.quantity}
            min={0}
            increment={add}
            decrement={remove}
          />
        ) : (
          <Svg type="cart-icon" width={25} height={22} onClick={onSelectItem} />
        )}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
