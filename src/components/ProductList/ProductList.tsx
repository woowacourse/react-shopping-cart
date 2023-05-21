import {useRecoilValueLoadable} from "recoil";
import {fetchProductList} from '../../recoil/productAtoms';
import type {ProductItem as ProductItemType} from '../../types/types';
import ProductItem from '../../components/ProductItem';
import {Col, Row} from '../../style/style';
import {ProductListWrapper} from "./ProductList.style.ts";

function ProductList() {

  const productLoadable = useRecoilValueLoadable<ProductItemType[]>(fetchProductList);

  switch (productLoadable.state) {
    case 'hasValue':
      return (
        <ProductListWrapper>
          <Row>
            {productLoadable?.contents?.map((product: ProductItemType) => (
              <Col key={product.id}>
                <ProductItem product={product}/>
              </Col>
            ))}
          </Row>
        </ProductListWrapper>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw productLoadable?.contents?.message;
    default:
      return null;
  }
}

export default ProductList;
