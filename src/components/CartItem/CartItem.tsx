import styled from '@emotion/styled';
import { Product } from '../../type';
import QuantityController from '../QuantityController/QuantityController';
import CheckBox from '../CheckBox/CheckBox';
import SmallButton from '../SmallButton/SmallButton';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';

interface CartItemProps {
  isChecked: boolean;
  product: Product;
  quantity: number;
  handleCheck: () => void;
  handleDelete: () => void;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
}

export default function CartItem({
  isChecked,
  product,
  quantity,
  handleCheck,
  handleDelete,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  return (
    <CartItemContainer>
      <CardItemHeader>
        <CheckBox isChecked={isChecked} onClick={handleCheck} />
        <SmallButton buttonText="삭제" onClick={handleDelete} />
      </CardItemHeader>
      <CardItemContent>
        <ProductImageBox src={product.imageUrl} alt={product.name} />
        <ProductInfoBox>
          <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{convertToLocaleAmount(product.price)}</ProductPrice>
          </div>
          <QuantityController
            quantity={quantity}
            maxQuantity={100}
            minQuantity={1}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
        </ProductInfoBox>
      </CardItemContent>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.li({
  borderTop: '1px solid #E5E5E5',
  padding: '12px 0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CardItemHeader = styled.div({
  height: '24px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const CardItemContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
});

interface ProductImageBoxProps {
  src: string;
  alt: string;
}

const ProductImageBox = styled.img<ProductImageBoxProps>(({ src, alt }: ProductImageBoxProps) => {
  return {
    width: '112px',
    height: '112px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    src,
    alt,
  };
});

const ProductInfoBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
  maxWidth: '246px',

  margin: '9px 0',
  textOverflow: 'ellipsis',
});

const ProductName = styled.p({
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

const ProductPrice = styled.p({
  color: '#000000',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '14px',
});
