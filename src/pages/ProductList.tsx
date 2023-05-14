import { useEffect } from 'react';
import { styled } from 'styled-components';
import ContentLayout from 'src/components/@common/ContentLayout';
import ProductItem from 'src/components/ProductItem';
import Header from 'src/components/Header';
import { useFetch } from 'src/hooks/useFetch';
import { useToast } from 'src/components/@common/Toast/hooks/useToast';
import { Product } from 'src/types';

const ProductList = () => {
  const { toast, renderToast } = useToast();
  useEffect(() => {
    if (error.isError) toast.error(error.message);
  }, []);

  const { data, error } = useFetch<{ choonsik: Product[] }>(
    process.env.PUBLIC_URL + '/mock/productList.json',
    { choonsik: [] }
  );

  const fetchedProductList = data.choonsik.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  return (
    <>
      <Header />
      <ContentLayout>
        <ProductListWrapper>{fetchedProductList}</ProductListWrapper>
      </ContentLayout>
      {renderToast()}
    </>
  );
};

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  column-gap: 24px;
  margin-top: 60px;
`;

export default ProductList;
