import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import CartIcon from '../assets/icons/cart.svg';
import useCartActions from '../hooks/useCartActions';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../type';
import Stepper from './common/Stepper';

const ProductListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 18px 8px;
  padding-bottom: 0;
`;

const ProductImage = styled.img`
  background: gray;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex: 1;

  & > *:last-child {
    margin-left: auto;
  }
`;

const ProductName = styled.p`
  font-size: 16px;
`;

const ProductPrice = styled.p`
  font-size: 20px;

  &::after {
    content: '원';
    padding-left: 8px;
  }
`;

const StepperContainer = styled.div`
  padding: 18px 0px;
`;

const AddCartButton = styled.button`
  padding: 0 10px 10px 10px;
`;

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product } = props;
  const cartItems = useRecoilValue(cartItemsState);
  const { setQuantity } = useCartActions();
  const cartItem = cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null;

  return (
    <ProductListItemContainer>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoContainer>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price.toLocaleString('ko-KR')}</ProductPrice>
        </ProductInfo>
        <StepperContainer>
          {cartItem === null ? (
            <AddCartButton onClick={() => setQuantity(product, 1)}>
              <img alt="카트" src={CartIcon} />
            </AddCartButton>
          ) : (
            <Stepper
              min={0}
              value={cartItem.quantity}
              onChange={(quantity) => setQuantity(product, quantity)}
            />
          )}
        </StepperContainer>
      </ProductInfoContainer>
    </ProductListItemContainer>
  );
};

export default ProductListItem;
