import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { fetchedProductListSelector } from '../../store/asyncSelector';
import { WIDTH } from '../../styles/mediaQuery';
import ProductCard from '../ProductCard/ProductCard';

const ProductCardList = () => {
  const fetchedProductList = useRecoilValue(fetchedProductListSelector);

  return (
    <Container>
      {fetchedProductList.map((product) => {
        const { id, name, price, imageUrl } = product;

        return (
          <ProductCard
            key={product.id}
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 80px 45px;

  @media (max-width: ${WIDTH.XL}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${WIDTH.LG}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${WIDTH.MD}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px 20px;
  }
`;

export default ProductCardList;
