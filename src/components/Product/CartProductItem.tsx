import { styled } from 'styled-components';
import { CartProduct } from '../../types/product';
import AmountCounter from '../Common/AmountCounter';
import TrashCanIcon from '../../assets/TrashCanIcon';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;

  return (
    <CartProductContainer>
      <div>
        <CheckBox type='checkbox' id='cart-product-check' />
        <label htmlFor='cart-product-check'></label>
      </div>
      <ProductImage
        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={name}
        loading='lazy'
      />
      <ProductName>{name}</ProductName>
      <CartInfoContainer>
        <DeleteButton type='button'>
          <TrashCanIcon />
        </DeleteButton>
        <AmountCounter
          count={quantity}
          addCount={() => {}}
          subtractCount={() => {}}
        />
        <ProductPrice>{price.toLocaleString('ko-KR')}원</ProductPrice>
      </CartInfoContainer>
    </CartProductContainer>
  );
};

const CartProductContainer = styled.div`
  display: flex;
  column-gap: 15px;
  width: 100%;
`;

const CheckBox = styled.input`
  display: none;

  + label {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  &:checked + label {
    background: ${({ theme }) => theme.colors.black};
  }

  &:checked + label::after {
    content: '✔️';
    position: absolute;
    top: 50%;
    left: 50%;
    color: ${({ theme }) => theme.colors.white};
    transform: translate(-50%, -50%);
  }
`;

const ProductImage = styled.img`
  width: 144px;
  height: 144px;
`;

const ProductName = styled.p`
  font-size: 20px;
  flex-grow: 1;
`;

const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  height: 24px;
  line-height: 24px;
`;

const ProductPrice = styled.p`
  height: 24px;
  line-height: 24px;
`;

export default CartProductItem;
