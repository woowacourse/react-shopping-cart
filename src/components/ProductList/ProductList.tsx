import type { ProductItem as ProductItemType } from "../../types/types";
import ProductItem from "../../components/ProductItem";
import { Col, Row } from "../../style/style";
import { ProductListWrapper } from "./ProductList.style.ts";

interface ProductListProps {
  productList: ProductItemType[];
}

function ProductList({ productList }: ProductListProps) {
  return (
    <ProductListWrapper>
      <Row>
        {productList.map((product: ProductItemType) => (
          <Col key={product.id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </ProductListWrapper>
  );
}

export default ProductList;
