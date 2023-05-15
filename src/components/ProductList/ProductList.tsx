import { useRecoilValueLoadable } from "recoil";
import { fetchProductList } from '../../recoil/productAtoms';
import type { ProductItem as ProductItemType } from '../../types/types';
import ProductItem from '../../components/ProductItem';
import { Column, Row } from '../../style/style';

function ProductList() {

  const productLoadable = useRecoilValueLoadable<ProductItemType[]>(fetchProductList);

  switch (productLoadable.state) {
    case 'hasValue':
      return (
        <Row>
          {productLoadable.contents.map((product: ProductItemType) => (
            <Column key={product.id}>
              <ProductItem product={product} />
            </Column>
          ))}
        </Row>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>Error: {productLoadable.contents}</div>;
    default:
      return null;
  }
}
export default ProductList;
