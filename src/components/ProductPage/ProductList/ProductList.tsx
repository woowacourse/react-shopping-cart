import { useRecoilValue } from 'recoil';
import { products } from '../../../atoms/products';
import ProductItem from '../ProductItem/ProductItem';
import * as S from './ProductList.styles';

const ProductList = () => {
  const { items } = useRecoilValue(products);

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
