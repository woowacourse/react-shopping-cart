import styled from 'styled-components';
import CartProduct from './CartProduct';

export default function CartOperatorBody({ products }) {
  return (
    <Styled.CartOperatorBody>
      <Styled.CartCounter>
        <p>배송 상품 {products.length}개</p>
      </Styled.CartCounter>
      {products.map(product => (
        <CartProduct key={product.id} product={product} />
      ))}
    </Styled.CartOperatorBody>
  );
}

const Styled = {
  CartOperatorBody: styled.div``,

  CartCounter: styled.div`
    padding-bottom: 20px;
    border-bottom: 4px solid #aaaaaa;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 33px;
    letter-spacing: 0.5px;

    color: #333333;
  `,
};
