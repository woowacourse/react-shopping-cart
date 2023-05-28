import { useRecoilValueLoadable } from "recoil";
import { ProductItem as ProductItemType } from "../types/types.ts";
import { fetchProductList } from "../recoil/productAtoms.ts";
import { ProductListWrapper } from "./ProductList/ProductList.style.ts";
import { Col, Row } from "../style/style.ts";
import ProductItemSkeleton from "./ProductItemSkeleton";

interface ProductFetcherProps {
  render: (products: ProductItemType[]) => JSX.Element;
}

function ProductFetcher({ render }: ProductFetcherProps) {
  const productLoadable =
    useRecoilValueLoadable<ProductItemType[]>(fetchProductList);
  const products: ProductItemType[] = productLoadable.contents;

  switch (productLoadable.state) {
    case "hasValue":
      return render(products);
    case "loading":
      return (
        <ProductListWrapper>
          <Row>
            {Array.from({ length: 30 }).map((_, i) => (
              <Col key={i}>
                <ProductItemSkeleton />
              </Col>
            ))}
          </Row>
        </ProductListWrapper>
      );
    case "hasError":
      throw productLoadable?.contents?.message;
    default:
      return null;
  }
}

export default ProductFetcher;
