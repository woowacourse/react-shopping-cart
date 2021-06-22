import { useOrder, useCart } from '../../hooks';
import { Header } from '../../components';
import { Item } from './Item';
import * as S from './style.js';

export const OrderListPage = () => {
  const { orders } = useOrder();
  const { addProduct } = useCart();

  return (
    <S.Page>
      <Header>주문목록</Header>
      <S.Main>
        {orders && (
          <S.OrderList>
            {orders?.map(({ orderId, orderDetails }) => (
              <S.OrderItem key={orderId}>
                <S.OrderLabel>
                  <S.OrderNumber>주문번호 : {orderId}</S.OrderNumber>
                  <S.ToDetailButton>상세보기 {`>`}</S.ToDetailButton>
                </S.OrderLabel>
                <S.OrderedProductList>
                  {orderDetails?.map((product) => (
                    <Item
                      key={product.productId}
                      product={product}
                      addProduct={() => addProduct(product.productId)}
                    />
                  ))}
                </S.OrderedProductList>
              </S.OrderItem>
            ))}
          </S.OrderList>
        )}
      </S.Main>
    </S.Page>
  );
};
