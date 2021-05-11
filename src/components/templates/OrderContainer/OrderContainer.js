import PropTypes from 'prop-types';
import { Container, Header, ProductList } from './OrderContainer.styles';

const OrderContainer = ({ orderId, children }) => (
  <Container>
    <Header>
      <span>{`주문번호: ${orderId}`}</span>
      <span>상세보기</span>
    </Header>
    <ProductList>{children}</ProductList>
  </Container>
);

OrderContainer.propTypes = {
  orderId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default OrderContainer;
