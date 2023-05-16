import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import { cartProductsState } from 'state/cartProducts';
import type { Product } from 'types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const { id, price, name, imageUrl } = product;
  const targetCartProduct = cartProducts.get(id);
  const cartProductQuantity = targetCartProduct?.quantity ?? 0;

  const initialAddCart = () => {
    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: 1, product });
    });
  };

  const decreaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product });
    });
  };

  const increaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product });
    });
  };

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        <CartQuantityStepper
          quantity={cartProductQuantity}
          initialIncrement={initialAddCart}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      </ProductImgContainer>
      <FlexBox>
        <FlexBox flexDirection="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export default ProductCard;
