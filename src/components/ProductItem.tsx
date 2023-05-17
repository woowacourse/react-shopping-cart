import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { ReactComponent as Cart } from '../assets/icons/cart.svg';
import useCartProduct from '../hooks/useCart';
import { cartItemFamily } from '../recoil/selectors/cartItemFamily';
import { productFamily } from '../recoil/selectors/productFamily';
import type { Product } from '../type';
import Stepper from './Stepper';

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductItemInfo = styled.div`
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

const ProductItemName = styled.p`
  font-size: 16px;
`;

const ProductItemPrice = styled.p`
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

type ProductItemProps = {
  productId: Product['id'];
};

const ProductItem = (props: ProductItemProps) => {
  const { productId } = props;

  const product = useRecoilValue(productFamily(productId));
  const cartProduct = useRecoilValue(cartItemFamily(productId));

  const { setQuantity } = useCartProduct(productId);

  if (!product) return <div>ERROR: No product!!</div>;

  return (
    <ProductItemContainer>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoContainer>
        <ProductItemInfo>
          <ProductItemName>{product.name}</ProductItemName>
          <ProductItemPrice>{product.price.toLocaleString('ko-KR')}</ProductItemPrice>
        </ProductItemInfo>
        <StepperContainer>
          {cartProduct === null ? (
            <AddCartButton onClick={() => setQuantity(1)}>
              <Cart />
            </AddCartButton>
          ) : (
            <Stepper min={0} value={cartProduct.quantity} onChange={setQuantity} />
          )}
        </StepperContainer>
      </ProductInfoContainer>
    </ProductItemContainer>
  );
};

export default ProductItem;
