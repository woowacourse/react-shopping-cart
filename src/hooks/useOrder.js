import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE } from '../constants';
import { fetchCompletedOrder, postOrders } from '../service/order';
import { formatPrice } from '../utils';
import useCarts from './useCarts';

const useOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems, getTotalPrice, getTotalQuantity } = useCarts();

  const page = useSelector(state => state.history.history.currentPage);

  const getCompletedOrder = () => dispatch(fetchCompletedOrder());

  const orderedItems = useSelector(state => state.product.product.orderedItems);

  const orderItems = cartItems.reduce((acc, item) => {
    const { cart_id, quantity } = item;
    const order = { cart_id, quantity };

    acc.push(order);

    return acc;
  }, []);

  const orderedItemDetail = itemId =>
    orderedItems.find(({ order_id }) => order_id === itemId);

  const totalPrice = formatPrice(getTotalPrice(cartItems));

  const totalQuantity = getTotalQuantity(cartItems);

  const routeToCompletedOrder = () => {
    history.push(ROUTE.COMPLETED_ORDER);
  };

  const makeOrder = async () => {
    if (!window.confirm('결제하시겠습니까?')) return;

    await postOrders(orderItems, dispatch);

    routeToCompletedOrder();
  };

  const isValidRoute = () => {
    if (page !== ROUTE.CART) {
      alert('잘못된 접근입니다.');

      history.push(ROUTE.HOME);

      return false;
    }
  };

  return {
    totalPrice,
    orderedItems,
    totalQuantity,
    makeOrder,
    isValidRoute,
    getCompletedOrder,
    orderedItemDetail,
  };
};

export default useOrder;
