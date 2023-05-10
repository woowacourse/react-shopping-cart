import styled from "styled-components";
import ProductList from "../../src/components/ProductListPage/ProductList";
export default function ProductListPage() {
  return (
    <ProductListWrapper>
      <ProductList />
    </ProductListWrapper>
  );
}

const ProductListWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
