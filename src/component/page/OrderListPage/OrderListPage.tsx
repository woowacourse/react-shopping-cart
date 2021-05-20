import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
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
import Header from '../../atom/Header/Header';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import OrderListLayout from '../../template/OrderListLayout/OrderListLayout';

const OrderListPage = ({ history, location }: RouteComponentProps) => {
  const { value: orderList }: { value: Array<OrderType> } =
    useServerAPI(ORDER_QUERY);

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

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <OrderListLayout
        orderList={orderList}
        products={products}
        onClickShoppingCartButton={onClickShoppingCartButton}
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

export default OrderListPage;
