import styled from 'styled-components';

export default function OrderList({ products }) {
  return (
    <OrderUl>
      {products.map(
        product =>
          product.checked && (
            <OrderLi key={product.id}>
              <span>{product.name}</span>
              <span>{product.count * product.price} 원</span>
            </OrderLi>
          )
      )}
    </OrderUl>
  );
}

const OrderUl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 15px;
`;

const OrderLi = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
