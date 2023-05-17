import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import styled from 'styled-components';
import { CartProduct } from 'types/product';
import { ReactComponent as RecycleBinIcon } from 'assets/recycle-bin-icon.svg';

type CartProductCardProps = {
  cartProduct: CartProduct;
};

const CartProductCard = ({ cartProduct }: CartProductCardProps) => {
  const { product, quantity } = cartProduct;
  const { name, price, imageUrl } = product;
  const { initialAddCart, decreaseQuantity, increaseQuantity } = useShoppingCart(product);
  const totalPrice = price * quantity;

  return (
    <CartProductCardContainer justify="flex-start" gap="16px" role="list">
      <CheckBox checked={true} onChange={() => {}} />
      <ProductImageWrapper>
        <ProductImage src={imageUrl} />
      </ProductImageWrapper>
      <ProductInfoContainer flexDirection="column" justify="space-between">
        <Container>
          <Title>{name}</Title>
          <ProductDeleteButton />
        </Container>
        <Container justify="flex-end">
          <CartQuantityStepper
            quantity={quantity}
            initialIncrement={initialAddCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
          <TotalPrice>{totalPrice.toLocaleString('ko-KR')}원</TotalPrice>
        </Container>
      </ProductInfoContainer>
    </CartProductCardContainer>
  );
};

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const ProductInfoContainer = styled(FlexBox)`
  position: relative;
  width: 100%;
  min-height: 150px;
`;

const CartProductCardContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-top: 1px solid #dddddd;
`;

const ProductImageWrapper = styled.div`
  width: 150px;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const Title = styled.span`
  width: 100%;
  font-size: 18px;
  overflow: hidden;
`;

const TotalPrice = styled.span`
  min-width: 100px;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const ProductDeleteButton = styled(RecycleBinIcon)`
  cursor: pointer;
`;

export default CartProductCard;
