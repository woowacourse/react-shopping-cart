import { CartStoreState, Product } from 'types/index';

import ProductCard from 'components/ProductCard/ProductCard';
import isProductInCart from 'utils/validator';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

type Props = {
  productList: Array<Product>;
};

function ProductCardGrid({ productList }: Props) {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );

  return (
    <StyledProductCardGrid>
      {productList.length > 0 ? (
        productList.map((product) => (
          <ProductCard
            product={product}
            isInCart={isProductInCart(product.id, cart)}
            key={product.id}
          />
        ))
      ) : (
        <Message>상품이 없어요 😢</Message>
      )}
    </StyledProductCardGrid>
  );
}

const StyledProductCardGrid = styled.div`
  display: grid;
  grid-gap: 40px;
  width: max-content;

  ${({ theme: { media } }) => media.sm`
    grid-template-columns: repeat(1, minmax(0, 1fr));
  `};

  ${({ theme: { media } }) => media.md`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `};

  ${({ theme: { media } }) => media.lg`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `};

  ${({ theme: { media } }) => media.xl`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `};
`;

const Message = styled.div`
  font-size: 25px;
  position: absolute;
`;

export default ProductCardGrid;
