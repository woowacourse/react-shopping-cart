import { useHistory } from 'react-router-dom';
import useSnackBar from '../../hooks/useSnackBar';

import PageTitle from '../../components/commons/PageTitle/PageTitle';
import OrderItemGroup from '../../components/commons/OrderItemGroup/OrderItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useOrders from '../../hooks/useOrders';
import useCart from '../../hooks/useCart';

import { getMoneyString } from '../../utils/format';
import { PATH } from '../../constants';

import * as Styled from './OrderListPage.styles';
import useProducts from '../../hooks/useProducts';

const OrderListPage = () => {
  const history = useHistory();
  const { products } = useProducts();
  const { orders, loading, responseOK } = useOrders();
  const { addCartItem } = useCart();
  const { SnackBar, snackBarMessage, setSnackBarMessage } = useSnackBar();

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  const onMoveToOrderDetailPage = (orderId: string) => {
    history.push(`${PATH.ORDER_DETAIL}/${orderId}`);
  };

  const onAddItemInCart = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);

    if (!product) return;

    try {
      await addCartItem(product);
      setSnackBarMessage(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
    } catch (error) {
      setSnackBarMessage(error.message);
    }
  };

  const orderList = orders.map(order => (
    <Styled.ItemGroupWrapper key={order.orderId}>
      <OrderItemGroup
        detailLinkButtonText="상세보기 >"
        orderNumber={String(order.orderId)}
        onDetailLinkClick={() => onMoveToOrderDetailPage(String(order.orderId))}
      >
        {order.orderDetails.map(item => (
          <Styled.OrderWrapper key={item.productId}>
            <ProductListItem
              size="MD"
              productThumbnail={item.thumbnail}
              productName={item.name}
              productPrice={getMoneyString(item.price)}
              productQuantity={item.quantity}
            />
            <Button size="SM" onClick={() => onAddItemInCart(item.productId)}>
              장바구니 담기
            </Button>
          </Styled.OrderWrapper>
        ))}
      </OrderItemGroup>
    </Styled.ItemGroupWrapper>
  ));

  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문목록</PageTitle>
        </Styled.PageTitleWrapper>
        {orderList.reverse()}
      </Styled.PageWrapper>
      <SnackBar key={Math.random()} message={snackBarMessage} setMessage={setSnackBarMessage} />
    </Styled.OrderListPage>
  );
};

export default OrderListPage;
