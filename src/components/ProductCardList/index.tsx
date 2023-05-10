import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { fetchedProductListState } from '../../recoil/selectors/fetchSelectors';
import ProductCard from '../ProductCard';

const ProductCardList = () => {
  const fetchedProductList = useRecoilValue(fetchedProductListState);

  return (
    <Styled.Container>
      {fetchedProductList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 80px 45px;
  `,
};
export default ProductCardList;
