import ProductItem from '../ProductItem/ProductItem';
import { Column, Row } from '../../styles/style';
import { useReadOnlyProductList } from '../../hooks/productListState/productListState';

function ProductList() {
  const productList = useReadOnlyProductList();

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
