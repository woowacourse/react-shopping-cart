import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { ReactComponent as Cart } from '../assets/icons/cart.svg';
import cartState from '../recoil/atoms/cartState';
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
  product: Product;
};

const ProductItem = (props: ProductItemProps) => {
  const { product } = props;
  const [cart, setCart] = useRecoilState(cartState);

  const cartProduct = cart.find((it) => it.productId === product.id) ?? null;

  const setQuantity = (quantity: number) => {
    if (cartProduct === null) {
      setCart([
        ...cart,
        { id: Math.round(Math.random() * 100000), quantity, productId: product.id },
      ]);
      return;
    }

    const cartProductIndex = cart.findIndex((it) => it.id === cartProduct.id);
    const newCart = [
      ...cart.slice(0, cartProductIndex),
      {
        ...cartProduct,
        quantity,
      },
      ...cart.slice(cartProductIndex + 1),
    ].filter((it) => it.quantity > 0);
    setCart(newCart);
  };

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
