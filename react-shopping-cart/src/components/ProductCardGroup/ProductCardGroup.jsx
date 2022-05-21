import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ProductCard from 'components/ProductCard/ProductCard';

import { selectCurrentCarts } from 'redux/carts/carts.selector';
import { selectCurrentProducts } from 'redux/products/products.selector';

import { isInCart } from 'utils/check';

//TODO: 스토리북
function ProductCardGroup() {
  const products = useSelector(selectCurrentProducts);
  const carts = useSelector(selectCurrentCarts);

  return (
    <Styled.Root>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            // THINK: isincart를 여기서 하는 게 맞을까? 여기서 하면 안될듯
            $isincart={isInCart(product.id, carts)}
            {...product}
          />
        );
      })}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    display: grid;
    width: 70%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 22px;
    justify-content: center;
  `,
};

export default ProductCardGroup;
