import { styled } from 'styled-components';
import { CartIcon } from '../assets/svg';
import { useCart } from '../hooks/useCart';
import Stepper from './Stepper';

interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Props {
  data: IProduct;
}

export default function Product({ data }: Props) {
  const { addToCart, findProductInCart, isSelected } = useCart();
  const productInCart = findProductInCart(data.id);
  const isInCart = Boolean(productInCart);

  return (
    <Style.Container>
      <Style.ProductImageWrapper>
        <Style.ProductImage src={data.imageUrl} alt={data.name} loading="lazy" />
      </Style.ProductImageWrapper>
      <Style.ProductInfo>
        <Style.ProductNameAndStepperContainer>
          <Style.ProductName title={data.name}>{data.name}</Style.ProductName>
          {isSelected(data.id) ? (
            <Style.StepperWrapper isInCart={isInCart}>
              <Stepper initCount={productInCart?.quantity} productId={data.id} />
            </Style.StepperWrapper>
          ) : (
            <Style.CartIconWrapper onClick={() => addToCart(data.id)}>
              <CartIcon fill="#AAAAAA" />
            </Style.CartIconWrapper>
          )}
        </Style.ProductNameAndStepperContainer>
        <Style.ProductPrice>{data.price.toLocaleString('ko-KR')}원</Style.ProductPrice>
      </Style.ProductInfo>
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

  StepperWrapper: styled.div<{ isInCart: boolean }>`
    animation: ${(props) => !props.isInCart && 'drawStepper 0.3s ease-in-out'};
  `,

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: fit-content;

    cursor: pointer;
  `,
};
