import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import useLocalCart from '../../hooks/useLocalCart';
import { fetchedProductListSelector } from '../../store/fetchSelectors';
import ProductCard from '../ProductCard/ProductCard';

const ProductCardList = () => {
  const fetchedProductList = useRecoilValue(fetchedProductListSelector);

  useLocalCart();

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
`;

export default ProductCardList;
