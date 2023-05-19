import { Image as ProductImage } from './common/Image';
import { CheckBox } from './common/CheckBox';
import { styled } from 'styled-components';
import { StyledText } from './common/Text';
import { DeleteProductButtonImage } from '../assets/image';
import { AddToCartCount } from './AddToCartCount';
import { CartProductList } from '../types/productType';
import { useCartState } from './hooks/useCartState';

interface CartProductItemProps {
  cartProduct: CartProductList;
}

export const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { id, quantity, product } = cartProduct;
  const { increaseCount, decreaseCount, deleteCartItem } =
    useCartState(product);

  const handleIncreaseCount = () => {
    increaseCount();
  };

  const handleDecreaseCount = () => {
    decreaseCount(false);
  };

  return (
    <CartProductItemContainer key={id}>
      <LeftSideWrapper>
        <CheckBox />
        <ProductImage source={product.imageUrl} alternative="상품 이미지" />
        <ProductTitle size="20px" weight="600">
          {product.name}
        </ProductTitle>
      </LeftSideWrapper>

      <RightSideWrapper>
        <DeleteProductButtonImage onClick={deleteCartItem} />
        <AddToCartCount
          quantity={quantity}
          increaseCount={handleIncreaseCount}
          decreaseCount={handleDecreaseCount}
        />
        <ProductPrice size="18px" weight="600">
          {`${product.price.toLocaleString('ko-KR')} 원`}
        </ProductPrice>
      </RightSideWrapper>
    </CartProductItemContainer>
  );
};

const CartProductItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
`;

const LeftSideWrapper = styled.div`
  display: flex;

  & > :nth-child(1) {
    margin-right: 30px;
  }
`;

const ProductTitle = styled(StyledText)`
  margin: 2px 0 10px 30px;
`;

const ProductPrice = styled(StyledText)`
  margin: 0 0 10px 0;
`;

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  & > :nth-child(1) {
    margin: 5px 0 20px 0;
  }

  & > :nth-child(2) {
    margin: 0 0 30px 0;
  }

  & > :nth-child(3) {
    margin: 0 0 15px 0;
  }
`;
