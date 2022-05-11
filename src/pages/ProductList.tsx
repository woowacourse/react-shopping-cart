import styled from "styled-components";
import Product from "../components/Product";

function ProductList() {
  return (
    <div>
      <Wrapper>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Wrapper>
    </div>
  );
}

export default ProductList;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  gap: 20px;
  padding: 50px 240px;
`;
