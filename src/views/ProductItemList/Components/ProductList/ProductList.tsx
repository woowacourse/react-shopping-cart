import { useProductListReadOnly } from '../../../../recoil/product/productListState';
import { Column, Row } from '../../../../styles/style';
import ProductItem from '../../../ProductItem/ProductItem';

function ProductList() {
  const productList = useProductListReadOnly();

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
