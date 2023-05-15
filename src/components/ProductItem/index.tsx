import useProductSelect from 'src/hooks/useProductSelect';
import { Product } from 'src/types';
import Svg from '../@common/Svg';
import Toast from '../@common/Toast';
import Counter from '../Counter';
import * as S from './ProductItem.styles';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { currentCartItem, remove, add, onSelectItem, isFirst } =
    useProductSelect(product);

  const productSelect = currentCartItem ? (
    <Counter count={currentCartItem.quantity} add={add} remove={remove} />
  ) : (
    <Svg type="cart-icon" width={25} height={22} onClick={onSelectItem} isClickable={true}/>
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
      {isFirst && <Toast type="success" message="장바구니에 추가했습니다." />}
    </S.ItemWrapper>
  );
};

export default ProductItem;
