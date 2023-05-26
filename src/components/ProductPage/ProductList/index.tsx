import { useProductListReadOnly } from '../../../recoil/product';
import ProductItem from '../ProductItem';
import * as S from './ProductList.styles';

const ProductList = () => {
  const productList = useProductListReadOnly();

  return (
    <S.List>
      {productList.map((product) => (
        <li key={product.id}>
          <ProductItem {...product} />
        </li>
      ))}
    </S.List>
  );
};

export default ProductList;
