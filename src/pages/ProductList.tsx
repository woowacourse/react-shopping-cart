import ContentLayout from 'src/components/@common/ContentLayout';
import ProductItem from 'src/components/ProductItem';
import Header from 'src/components/@common/Header';
import { styled } from 'styled-components';
import { Suspense } from 'react';
import useGetCartList from 'src/hooks/useGetCartList';
import useGetPRoductList from 'src/hooks/useGetProductList';

const ProductList = () => {
  const productList = useGetPRoductList();
  useGetCartList();

  const fetchedProductList = productList.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Header />
      <ContentLayout>
        <ProductListWrapper>{fetchedProductList}</ProductListWrapper>
      </ContentLayout>
    </Suspense>
  );
};

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  column-gap: 24px;
  margin-top: 60px;

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductList;
