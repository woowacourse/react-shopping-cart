import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { useFetchData } from '../../hooks/useFetchData';
import { Product } from '../../types';
import { PRODUCT_BASE_URL } from '../../constants/url';
import { productListState } from '../../store/ProductListState';
import { useEffect } from 'react';

const ProductList = () => {
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);

  const { api, isLoading } = useFetchData<Product[]>(setProductList);

  useEffect(() => {
    api.get(PRODUCT_BASE_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Wrapper>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        productList.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imgUrl={`${process.env.PUBLIC_URL}${product.imageUrl}`}
          />
        ))
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 86px 4%;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px 120px;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media all and (max-width: 479px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export default ProductList;
