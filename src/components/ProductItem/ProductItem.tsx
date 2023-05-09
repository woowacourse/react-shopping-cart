import * as Styled from './ProductItem.styles.tsx';
import bagel from '../../assets/itemImages/bagel.png';
import ShoppingCartLogo from '../@common/ShoppingCartLogo.tsx';

const ProductItem = () => {
  return (
    <Styled.ProductItemWrapper>
      <Styled.ImageContainer>
        <Styled.ProductItemImage src={bagel} />
      </Styled.ImageContainer>
      <Styled.ProductItemInfo>
        <Styled.ProductItemInfoUpperBoundary>
          <Styled.ProductItemTitle>밀크티</Styled.ProductItemTitle>
          <Styled.CartButton>
            <ShoppingCartLogo isFlipped={true} width={24} height={22} />
          </Styled.CartButton>
        </Styled.ProductItemInfoUpperBoundary>
        <Styled.ProductItemPrice>1000원</Styled.ProductItemPrice>
      </Styled.ProductItemInfo>
    </Styled.ProductItemWrapper>
  );
};

export default ProductItem;
