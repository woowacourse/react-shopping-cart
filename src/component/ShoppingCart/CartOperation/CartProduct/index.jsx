import styled from 'styled-components';
import Counter from 'component/common/Counter';
import CheckBox from 'component/common/CheckBox';
import Button from 'component/common/Button';

export default function CartProduct({ product }) {
  const { image, name, price, count } = product;

  return (
    <CartProductBox>
      <CartProductPresentBox>
        <CheckBox />
        <CartProductImage src={image} />
        <ProductName>{name}</ProductName>
      </CartProductPresentBox>
      <CarProductOperateBox>
        <Button>
          <img src="trashCan.svg" />
        </Button>
        <Counter initialCount={count} />
        <p>{price.toLocaleString('ko-KR')}</p>
      </CarProductOperateBox>
    </CartProductBox>
  );
}

const CartProductImage = styled.img`
  width: 144px;
  height: 147px;
  margin-left: 15px;
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
