import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ORDER_QUERY, ROUTE } from '../../../constant';
import {
  useLikedProducts,
  useRecommendProduct,
  useServerAPI,
  useSuccessAddedModal,
} from '../../../hook';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { OrderType } from '../../../type';
import { numberWithCommas } from '../../../util';
import Header from '../../atom/Header/Header';
import PaymentInfoBox from '../../molecule/PaymentInfoBox/PaymentInfoBox';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import OrderListLayout from '../../template/OrderListLayout/OrderListLayout';

interface MatchParams {
  id: string;
}

const OrderDetailPage = ({
  match,
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const { id: orderId } = match.params;
  const { value: orderList } = useServerAPI<OrderType>(ORDER_QUERY);

  const targetOrder = orderList.find(
    (order) => Number(order.order_id) === Number(orderId)
  );

  const { products, shoppingCartProducts } = useSelector(
    ({ productListReducer, myShoppingCartReducer }: RootState) => ({
      products: productListReducer.products,
      shoppingCartProducts: myShoppingCartReducer.products,
    })
  );

  const { likedProducts } = useLikedProducts(products);
  const { recommendedProductList } = useRecommendProduct(
    products,
    likedProducts
  );

  const {
    isModalOpen,
    onClickModalClose,
    openModal,
    onClickTrigger: onClickShoppingCartButton,
  } = useSuccessAddedModal(shoppingCartProducts, products);

  if (!targetOrder) {
    return <>No Result</>;
  }

  const expectedPrice = targetOrder.order_details.reduce(
    (acc, orderDetail) => acc + orderDetail.price * orderDetail.quantity,
    0
  );

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문내역상세</Header>

      <OrderListLayout
        orderList={[targetOrder]}
        products={products}
        onClickShoppingCartButton={onClickShoppingCartButton}
      />

      <PaymentInfoBox
        title="결제금액 정보"
        detailText="총 결제 금액"
        price={numberWithCommas(expectedPrice)}
      />

      <SuccessAddedModal
        isModalOpen={isModalOpen}
        onClickModalCloseButton={onClickModalClose}
        productList={recommendedProductList}
        openModal={openModal}
        onClickMoveShoppingCartButton={() =>
          history.push({ pathname: ROUTE.SHOPPING_CART })
        }
      />
    </ScreenContainer>
  );
};

export default OrderDetailPage;
