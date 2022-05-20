import styled from 'styled-components';
import Counter from 'component/common/Counter';
import CheckBox from 'component/common/CheckBox';
import Button from 'component/common/Button';
import { useDispatch } from 'react-redux';
import {
  addProductCart,
  checkProductCart,
  removeProductCart,
  subtractProductCart,
} from 'store/action/cartActions';

export default function CartProduct({ product }) {
  const { image, name, price, count } = product;
  const dispatch = useDispatch();

  const handleUpClick = () => {
    dispatch(addProductCart(product));
  };

  const handleDownClick = () => {
    dispatch(subtractProductCart(product));
  };

  const handleCheckChange = () => {
    dispatch(checkProductCart(product, !product.checked));
  };

  const handleDeleteClick = () => {
    dispatch(removeProductCart(product));
  };

  return (
    <CartProductBox>
      <CartProductPresentBox>
        <CheckBox checked={product.checked} onCheckChange={handleCheckChange} />
        <CartProductImage src={image} />
        <ProductName>{name}</ProductName>
      </CartProductPresentBox>

      <CarProductOperateBox>
        <Button onClick={handleDeleteClick}>
          <img src="trashCan.svg" />
        </Button>
        <Counter count={count} onUPClick={handleUpClick} onDownClick={handleDownClick} />
        <p>{price.toLocaleString('ko-KR')}</p>
      </CarProductOperateBox>
    </CartProductBox>
  );
}

const CartProductImage = styled.img`
  width: 144px;
  height: 147px;
  margin-left: 15px;

  object-fit: cover;
`;

const CartProductBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 23px 0;
  border-bottom: 2px solid #cccccc;
`;

const CartProductPresentBox = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CarProductOperateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProductName = styled.p`
  margin-left: 20px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;
