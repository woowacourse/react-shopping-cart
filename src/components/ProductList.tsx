import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { useFetchData } from '../hooks/useFetchData';
import { Product } from '../types';
import { MOCK_DATA_URL } from '../constants/url';
import { productListState } from '../store/ProductListState';

const ProductList = () => {
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);

  useFetchData<Product[]>(MOCK_DATA_URL, setProductList);

  return (
    <S.Wrapper>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imgUrl={`${process.env.PUBLIC_URL}${product.imageUrl}`}
        />
      ))}
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
  `,
};

export default ProductList;
