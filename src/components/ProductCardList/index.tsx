import { styled } from 'styled-components';
import ProductCard from '../ProductCard';

const ProductCardList = () => {
  return (
    <Styled.Container>
      {Array(12)
        .fill('')
        .map((_, index) => (
          <ProductCard key={index} />
        ))}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 80px 45px;

    width: 80%;
  `,
};
export default ProductCardList;
