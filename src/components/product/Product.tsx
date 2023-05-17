import { styled } from 'styled-components';
import { CartIcon } from '../../assets/svg';
import { ProductInfo } from '../../types';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import Stepper from '../Stepper';
import Toast from '../common/Toast';

interface Props {
  info: ProductInfo;
}

export default function Product({ info }: Props) {
  const { id, name, price, imageUrl } = info;
  const { addToCart, getProductInCart, updateProductQuantity } = useCart(id);
  const { isOpenToast, openToast, closeToast } = useToast();
  const productInCart = getProductInCart();

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
          {productInCart ? (
            <Stepper quantity={productInCart.quantity} updateQuantity={updateProductQuantity} />
          ) : (
            <Style.CartIconWrapper onClick={handleCartClick}>
              <CartIcon fill="#AAAAAA" />
            </Style.CartIconWrapper>
          )}
        </Style.ProductNameAndStepperContainer>
        <Style.ProductPrice>{price.toLocaleString('ko-KR')}원</Style.ProductPrice>
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

  ProductPrice: styled.p`
    font-size: 20px;
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
