import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ProductCard from 'components/ProductCard/ProductCard';

import { selectCurrentCarts } from 'redux/carts/carts.selector';

import { isInCart } from 'utils/check';

//TODO: 스토리북
function ProductCardGroup({ products }) {
  const carts = useSelector(selectCurrentCarts);

  return (
    <Styled.GridContainer>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            {...product}
            $isincart={isInCart(product.id, carts)}
          />
        );
      })}
    </Styled.GridContainer>
  );
}

const Styled = {
  GridContainer: styled.div`
    display: grid;
    width: 70%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 22px;
    justify-content: center;
  `,
};

export default ProductCardGroup;
