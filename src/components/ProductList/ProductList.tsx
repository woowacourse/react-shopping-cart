import { Column, Row } from '../../style/style';
import ProductItem from '../ProductItem/ProductItem';
import useLoadInitData from '../../hooks/useLoadInitData';
import { useRecoilValue } from 'recoil';
import productListState from '../../recoil/productListState';

function ProductList() {
  useLoadInitData();
  const productList = useRecoilValue(productListState);

  return (
    <Row>
      {productList.map((product) => (
        <Column key={product.id}>
          <ProductItem product={product} />
        </Column>
      ))}
    </Row>
  );
}

export default ProductList;
