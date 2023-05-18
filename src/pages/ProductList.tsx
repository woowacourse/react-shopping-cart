import { useEffect } from 'react';
import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import ProductItem from 'components/ProductItem';
import Header from 'components/Header';
import LoadingSkeleton from 'components/ProductItem/LoadingSkeleton';
import { useFetch } from 'hooks/useFetch';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { Product } from 'types';

const ProductList = () => {
  const { renderToast } = useToast();
  const { data, isLoading, api } = useFetch<{ choonsik: Product[] }>();

  useEffect(() => {
    api.get('/api/products');
  }, []);

  const loading =
    isLoading &&
    Array.from({ length: 16 }).map((_, idx) => <LoadingSkeleton key={idx} />);

  const fetchedProductList =
    data &&
    data.choonsik.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));

  return (
    <>
      <Header />
      <ContentLayout>
        <ProductListWrapper>
          {loading}
          {fetchedProductList}
        </ProductListWrapper>
      </ContentLayout>
      {renderToast}
    </>
  );
};

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  column-gap: 24px;
  margin-top: 60px;

  @media (min-width: 720px) and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 480px) and (max-width: 719px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 320px) and (max-width: 479px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductList;
