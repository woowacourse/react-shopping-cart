import { styled } from 'styled-components';
import { CartIcon } from '../../assets/svg';
import { ProductInfo } from '../../types';
import { PRODUCT } from '../../constants';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import Stepper from '../Stepper';
import Toast from '../common/Toast';
import Price from '../common/Price';

interface Props {
  productInfo: ProductInfo;
}

export default function Product({ productInfo }: Props) {
  const { name, price, imageUrl } = productInfo;
  const { addToCart, getCartItem, updateProductQuantity } = useCart(productInfo);
  const { isOpenToast, openToast, closeToast } = useToast();
  const cartItem = getCartItem();

  const handleCartClick = () => {
    addToCart();
    openToast();
  };

  return (
    <Style.Container>
      <Style.ProductImageWrapper>
        <Style.ProductImage src={imageUrl} alt={name} loading="lazy" />
      </Style.ProductImageWrapper>
      <Style.ProductInfo>
        <Style.ProductNameAndStepperContainer>
          <Style.ProductName title={name}>{name}</Style.ProductName>
          {cartItem ? (
            <Stepper
              quantity={cartItem.quantity}
              maxQuantity={PRODUCT.MAX_COUNT}
              updateQuantity={updateProductQuantity}
            />
          ) : (
            <Style.CartIconWrapper onClick={handleCartClick} aria-label="장바구니 추가">
              <CartIcon fill="#AAAAAA" />
            </Style.CartIconWrapper>
          )}
        </Style.ProductNameAndStepperContainer>
        <Price price={price} size={'large'} label={`${name}`} />
      </Style.ProductInfo>
      <Toast
        isOpenToast={isOpenToast}
        closeToast={closeToast}
        message="✨ 상품을 장바구니에 담았습니다."
      />
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    cursor: pointer;
  `,

  ProductImageWrapper: styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
  `,

  ProductImage: styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ProductInfo: styled.div`
    padding: 18px 0 0 0;
    letter-spacing: 0.5px;
  `,

  ProductNameAndStepperContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 8px;
  `,

  ProductName: styled.p`
    max-width: 120px;
    overflow: hidden;

    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: 30px;

    cursor: pointer;
  `,
};
