import styled from 'styled-components';

export default function OrderList({ products }) {
  return (
    <Styled.OrderUl>
      {products.map(
        product =>
          product.checked && (
            <Styled.OrderLi key={product.id}>
              <span>{product.name}</span>
              <span>{product.count * product.price} 원</span>
            </Styled.OrderLi>
          )
      )}
    </Styled.OrderUl>
  );
}

const Styled = {
  OrderUl: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    margin-bottom: 15px;
  `,

  OrderLi: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
};
