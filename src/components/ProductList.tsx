import { styled } from 'styled-components';
import ProductItem from './ProductItem';

const ProductList = () => {
  const productList = Array.from({ length: 12 }).map((_, index) => {
    return (
      <ProductItem
        key={index}
        imgSrc={`${process.env.PUBLIC_URL}/assets/product1.svg`}
        name="test"
        price={1000}
        isSelected={false}
      />
    );
  });

  return <S.Wrapper>{productList}</S.Wrapper>;
};

const S = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
    width: 1270px;
    margin: 0 auto;
  `,
};

export default ProductList;
