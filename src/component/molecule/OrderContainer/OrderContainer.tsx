import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constant';
import { Container, Header, ProductList } from './OrderContainer.styles';

interface OrderContainerProps {
  orderId: string;
  children: React.ReactNode;
}
const OrderContainer = ({ orderId, children }: OrderContainerProps) => (
  <Container>
    <Header>
      <span>{`주문번호: ${orderId}`}</span>
      <Link to={ROUTE.GET_ORDER_DETAIL(orderId)}>
        <span>상세보기</span>
      </Link>
    </Header>
    <ProductList>{children}</ProductList>
  </Container>
);

export default OrderContainer;
export type { OrderContainerProps };
