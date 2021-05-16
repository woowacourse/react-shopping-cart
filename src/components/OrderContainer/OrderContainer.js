import PropTypes from 'prop-types';
import { Container, Header, ProductList } from './OrderContainer.styles';

const OrderContainer = ({ orderId, children, onClickDetail, showDetailButton }) => (
  <Container>
    <Header>
      <span>{`주문번호: ${orderId}`}</span>
      {showDetailButton && (
        <button type="button" onClick={onClickDetail}>
          {'상세보기 >'}
        </button>
      )}
    </Header>
    <ProductList>{children}</ProductList>
  </Container>
);

OrderContainer.propTypes = {
  orderId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClickDetail: PropTypes.func,
  showDetailButton: PropTypes.bool,
};

OrderContainer.defaultProps = {
  onClickDetail: () => {},
  showDetailButton: true,
};
export default OrderContainer;
