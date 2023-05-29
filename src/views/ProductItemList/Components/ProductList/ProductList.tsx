import { useProductList } from '../../../../recoil/product/productListState';
import { Column, Row } from '../../../../styles/style';
import ProductItem from '../../../ProductItem/ProductItem';

function ProductList() {
  const productList = useProductList();

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
