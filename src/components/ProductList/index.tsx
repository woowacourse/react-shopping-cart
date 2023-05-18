import styled from 'styled-components';
import useProductList from '@hooks/useProductList';
import ProductItem from './ProductItem';

const ProductList = () => {
  const productList = useProductList();
  const productsId:number[] = []

  productList.forEach((element: {}, index: number) => {
    productsId.push(index);
  });
  return (
    <Container>
      {productList.map((product, index) => (
        <ProductItem product={product} key={productsId[index]}/>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 80px 46px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductList;
