import styled from 'styled-components';
import CartProduct from './CartProduct';

export default function CartOperation() {
  return (
    <CartOperationBox>
      <CartOperationHead>
        <label>
          <input type="checkbox"></input>
          선택해제
        </label>
        <button>상품 삭제</button>
      </CartOperationHead>
      <CartOperationBody>
        <CartCounter>
          <p>
            배송 상품 <span>3</span>개
          </p>
        </CartCounter>
        <CartProduct />
      </CartOperationBody>
    </CartOperationBox>
  );
}

const CartOperationBox = styled.div`
  width: 736px;
`;

const CartOperationHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const CartOperationBody = styled.div``;

const CartCounter = styled.div`
  padding-bottom: 20px;
  border-bottom: 4px solid #aaaaaa;
`;
