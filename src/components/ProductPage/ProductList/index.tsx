import { useProductListReadOnly } from '../../../recoil/product';
import ProductItem from '../ProductItem';
import * as S from './ProductList.styles';

const ProductList = () => {
  const productList = useProductListReadOnly();

  const EmptyProductList = () => {
    return <h1>해당 상품이 없습니다.</h1>;
  };

  const ProductListItems = () => {
    return productList.map((product) => (
      <li key={product.id}>
        <ProductItem {...product} />
      </li>
    ));
  };

  const products = productList.length ? ProductListItems() : EmptyProductList();

  return <S.List>{products}</S.List>;
};

export default ProductList;
