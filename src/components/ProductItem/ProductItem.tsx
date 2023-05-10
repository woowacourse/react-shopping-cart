import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { SmallCartIcon } from '../../assets/icons';
import { formatPrice } from '../../utils/formatPrice';
import Counter from '../Counter/Counter';
import useCartService from '../../hooks/useCartService';
import { productQuantityInCart } from '../../selectors';
import type { Product } from '../../types/product';

const ProductItem = (product: Product) => {
  const { id, name, price, imageSrc } = product;
  const { addProductToCart, updateProductQuantity, removeProductFromCart } =
    useCartService();
  const quantityInCart = useRecoilValue(productQuantityInCart(id));

  const handleClickCartButton = () => {
    addProductToCart(product);
  };

  const handleChangeQuantity = (count: number) => {
    if (count === 0) {
      removeProductFromCart(id);
      return;
    }

    updateProductQuantity(id, count);
  };

  return (
    <ItemContainer>
      <ImageWrapper>
        <Image src={imageSrc} loading="lazy" alt={name} />
        <ImageBackground />
      </ImageWrapper>

      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>

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

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 282px;
  height: 282px;
`;

const ImageBackground = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.05);
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
  background: none;
  border: none;

  cursor: pointer;
`;

export default ProductItem;
