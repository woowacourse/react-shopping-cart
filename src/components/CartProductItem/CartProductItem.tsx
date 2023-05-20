import { styled } from 'styled-components';
import checkIcon from '../../assets/check.svg';
import trashBin from '../../assets/trash-bin.svg';
import StepperInput from '../@common/StepperInput/StepperInput';
import { CartItem } from '../../types';

const CartProductItem = ({ product, quantity }: CartItem) => {
  const { name, price, imageUrl } = product;

  return (
    <ProductItem>
      <Label>
        <Input type='checkbox' icon={checkIcon} />
      </Label>
      <ProductImageContainer>
        <ProductImage alt={name} src={imageUrl} />
      </ProductImageContainer>
      <ProductInfo>
        <ProductInfoUpperBoundary>
          <ProductName>{name}</ProductName>
          <ProductDeleteButton>
            <img src={trashBin} alt={`${name}상품 삭제`} />
          </ProductDeleteButton>
        </ProductInfoUpperBoundary>
        <StepperInput min={1} max={99} initialValue={quantity} $width={115} getValue={() => {}} />
        <ProductPriceInfo>
          <span>{price.toLocaleString()}원</span>
        </ProductPriceInfo>
      </ProductInfo>
    </ProductItem>
  );
};

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  height: 192px;
  & + & {
    border-top: 1.5px solid #cccccc;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 4px 0;
`;

const ProductImageContainer = styled.div`
  position: relative;
  margin: 0 20px 0 15px;
  flex: 0 0 144px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-color: var(--color-image-overlay);
    background-size: 100%;
    z-index: 1;
  }
`;

const ProductImage = styled.img`
  width: 144px;
  height: 144px;
`;

const Label = styled.label`
  width: 28px;
  height: 28px;
  align-self: flex-start;
`;

const Input = styled.input<{ icon: string }>`
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: #333333;
    border: 1px solid #3288ff;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const ProductDeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ProductInfoUpperBoundary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProductName = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const ProductPriceInfo = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;

  color: #333333;
`;

export default CartProductItem;
