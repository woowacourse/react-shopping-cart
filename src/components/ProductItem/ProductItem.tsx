import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Counter from '../Counter/Counter';
import ProductImage from '../ProductImage/ProductImage';
import { SmallCartIcon } from '../../assets/icons';
import { formatPrice } from '../../utils/formatPrice';
import useCartService from '../../hooks/useCartService';
import { productQuantityInCart } from '../../recoil/selectors';
import type { Product } from '../../types/product';

const ProductItem = (product: Product) => {
  const { id, name, price, imageSrc } = product;
  const { addProductToCart, updateProductQuantity, removeProductFromCart } =
    useCartService();
  const quantityInCart = useRecoilValue(productQuantityInCart(id));

  const handleClickCartButton = () => {
    addProductToCart(product);
  };

  const handleChangeQuantity = (quantity: number) => {
    if (quantity === 0) {
      removeProductFromCart(id);
      return;
    }

    updateProductQuantity(id, quantity);
  };

  return (
    <ItemContainer>
      <ProductImageWrapper>
        <ProductImage src={imageSrc} alt={name} size="large" />
        <CartButtonWrapper>
          {quantityInCart ? (
            <Counter
              count={quantityInCart}
              onChangeCount={handleChangeQuantity}
            />
          ) : (
            <CartButton
              type="button"
              aria-label="장바구니에 추가하기"
              onClick={handleClickCartButton}
            >
              <SmallCartIcon />
            </CartButton>
          )}
        </CartButtonWrapper>
      </ProductImageWrapper>
      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>
      </Contents>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;
`;

const ProductImageWrapper = styled.div`
  position: relative;
`;

const CartButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 400;
`;

const CartButton = styled.button`
  background: #fff;
  border: 1px solid #dddddd;

  padding: 7px;

  cursor: pointer;
`;

export default ProductItem;
