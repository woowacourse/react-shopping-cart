import styled from 'styled-components';
import OrderButton from './OrderButton';
import OrderList from './OrderList';
import TotalPrice from './TotalPrice';

export default function CartOrder({ products }) {
  const totalAmount = products.reduce((amount, product) => {
    return product.checked ? amount + product.price * product.count : amount;
  }, 0);

  const totalCount = products.reduce((count, product) => {
    return product.checked ? count + product.count : count;
  }, 0);

  return (
    <Styled.OrderBox>
      <Styled.OrderBoxHeader>결제예상금액</Styled.OrderBoxHeader>
      <Styled.OrderBoxBody>
        <OrderList products={products} />
        <TotalPrice totalAmount={totalAmount} />
        <OrderButton totalCount={totalCount} />
      </Styled.OrderBoxBody>
    </Styled.OrderBox>
  );
}

const Styled = {
  OrderBox: styled.div`
    width: 448px;
    height: 318px;
    display: flex;
    flex-direction: column;
  `,

  OrderBoxHeader: styled.div`
    display: flex;
    align-items: center;
    height: 41px;
    padding: 22px 30px;
    border: 1px solid #dddddd;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.5px;
  `,

  OrderBoxBody: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #dddddd;
    padding: 35px 30px;
  `,
};
