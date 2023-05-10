import { useRecoilValue } from 'recoil';
import { products } from '../../../recoil/products';
import ProductItem from '../ProductItem/ProductItem';
import * as S from './ProductList.styles';

const ProductList = () => {
  const {
    data: { items },
  } = useRecoilValue(products);

  if (!items) return null;

  return (
    <S.List>
      {items.map((product) => (
        <li key={product.id}>
          <ProductItem {...product} />
        </li>
      ))}
    </S.List>
  );
};

export default ProductList;
