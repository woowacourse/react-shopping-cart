import styled from 'styled-components';
import CartOperationHead from './CartOperationHead';
import CartProduct from './CartProduct';

export default function CartOperator({ products }) {
  return (
    <CartOperationBox>
      <CartOperationHead products={products} />
      <CartOperationBody>
        <CartCounter>
          <p>배송 상품 {products.length}개</p>
        </CartCounter>
        {products.map(product => (
          <CartProduct key={product.id} product={product} />
        ))}
      </CartOperationBody>
    </CartOperationBox>
  );
}

const CartOperationBox = styled.div`
  width: 736px;
`;

const CartOperationBody = styled.div``;

const CartCounter = styled.div`
  padding-bottom: 20px;
  border-bottom: 4px solid #aaaaaa;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;

  color: #333333;
`;
