import useCartUpdate from 'src/hooks/useCartUpdate';
import { Product } from 'src/types';
import Svg from '../@common/Svg';
import Counter from '../@common/Counter';
import * as S from './ProductItem.styles';
import { convertKORWon } from 'src/utils';
import { memo, useMemo } from 'react';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { currentCartItem, patchCartItem, addCartItem } = useCartUpdate(
    product.id
  );

  const onClick = () => addCartItem(product);

  const itemCount = patchCartItem(currentCartItem);

  const productSelect = useMemo(() => {
    return currentCartItem ? (
      <Counter
        count={currentCartItem.quantity}
        productCountMethod={itemCount}
      />
    ) : (
      <Svg
        type="cart-icon"
        width={25}
        height={22}
        onClick={onClick}
        cursor={'pointer'}
      />
    );
  }, [currentCartItem]);

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

export default memo(ProductItem);
