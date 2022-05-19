import styled from 'styled-components';
import Counter from 'component/common/Counter';

export default function CartProduct() {
  return (
    <CartProductBox>
      <CartProductPresentBox>
        <input type="checkbox" />
        <CartProductImage src="https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg" />
        <p>사과</p>
      </CartProductPresentBox>
      <CarProductOperateBox>
        <button>🗑</button>
        <Counter />
        <p>5,800원</p>
      </CarProductOperateBox>
    </CartProductBox>
  );
}

const CartProductImage = styled.img`
  width: 144px;
  height: 147px;
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
`;
