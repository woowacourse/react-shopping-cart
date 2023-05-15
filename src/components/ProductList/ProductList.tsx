import ProductItem from '../ProductItem/ProductItem';
import useLoadInitData from '../../hooks/useLoadInitData';
import useProductListValue from '../../hooks/useProductListValue';
import { Column, Row } from '../../styles/style';

function ProductList() {
  useLoadInitData();
  const productList = useProductListValue();

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
