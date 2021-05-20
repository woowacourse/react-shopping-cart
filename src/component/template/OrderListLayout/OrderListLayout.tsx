import { OrderType, ProductDetailType } from '../../../type';
import Button from '../../atom/Button/Button';
import OrderContainer from '../../molecule/OrderContainer/OrderContainer';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import { Container, OrderItemContainer } from './OrderListLayout.styles';

interface OrderListLayoutProps {
  orderList: Array<OrderType>;
  products: {
    [key: string]: ProductDetailType;
  };
  onClickShoppingCartButton: (id: string) => void;
}

const OrderListLayout = ({
  orderList,
  products,
  onClickShoppingCartButton,
}: OrderListLayoutProps) => (
  <>
    <Container>
      {orderList.map((order) => (
        <OrderContainer key={order.order_id} orderId={order.order_id}>
          {order.order_details.map(({ product_id, quantity }) => {
            const { image_url, name, price } = products[product_id];

            return (
              <OrderItemContainer key={product_id}>
                <RowProductItem
                  product_id={product_id}
                  image_url={image_url}
                  name={name}
                  price={price * quantity}
                  quantity={quantity}
                />
                <Button onClick={() => onClickShoppingCartButton(product_id)}>
                  장바구니
                </Button>
              </OrderItemContainer>
            );
          })}
        </OrderContainer>
      ))}
    </Container>
  </>
);

export default OrderListLayout;
