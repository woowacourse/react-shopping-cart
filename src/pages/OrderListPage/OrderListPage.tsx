import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ListItem from '../../components/commons/ListItem/ListItem';
import Button from '../../components/commons/Button/Button';
import useOrders from '../../hooks/useOrders';
import { getMoneyString } from '../../utils/format';
import { PATH } from '../../constants';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import * as Styled from './OrderListPage.styles';
import { requestAddProductToCart } from '../../apis';
import { CartItem, Order } from '../../type';
import useSnackbar from '../../hooks/layout/useSnackbar';
import useConfirmModal from '../../hooks/layout/useConfirmModal';
import ConfirmModal from '../../components/commons/Modal/ConfirmModal/ConfirmModal';
import { Snackbar } from '../../components/commons/Snackbar/Snackbar.styles';
import useCart from '../../hooks/useCart';

const OrderListPage = () => {
  const history = useHistory();

  const { isCartHasProduct } = useCart();
  const { orders, loading, responseOK, getOrderedProduct } = useOrders();
  const { isSnackbarShown, snackbarMessage, showSnackbar } = useSnackbar();

  const {
    confirmModalMessage,
    isConfirmModalShown,
    changeConfirmAction,
    confirmAction,
    hideConfirmModal,
    showConfirmModal,
  } = useConfirmModal();

  const onCartButtonClick = async (orderId: Order['id'], itemId: CartItem['id']) => {
    const product = getOrderedProduct(orderId, itemId);

    if (!product) {
      return;
    }

    if (isCartHasProduct(product.name)) {
      showSnackbar(`'${product.name}'은(는) 이미 장바구니에 담긴 상품입니다`);
      return;
    }

    showConfirmModal(`'${product?.name}'을(를) 장바구니에 담으시겠습니까?`);
    changeConfirmAction(async () => {
      try {
        await requestAddProductToCart(product.id);
        showSnackbar(`'${product?.name}'을(를) 장바구니에 담았습니다`);
      } catch (error) {
        showSnackbar('상품을 장바구니에 담지 못했습니다.');
      }
    });
  };

  const onOrderDetailLinkClick = (orderId: string) => {
    history.push(`${PATH.ORDER_DETAIL}/${orderId}`);
  };

  const orderList = orders.map(order => (
    <Styled.ItemGroupWrapper key={order.id}>
      <ItemGroup
        headerLinkButtonText="상세보기 >"
        headerText={`주문번호 : ${order.id}`}
        onHeaderLinkClick={() => onOrderDetailLinkClick(String(order.id))}
      >
        {order.orderItems.map(item => (
          <Styled.OrderWrapper key={item.id}>
            <ListItem
              size="MD"
              thumbnail={item.thumbnail}
              name={item.name}
              price={getMoneyString(item.price)}
              quantity={item.quantity}
            />
            <Button size="SM" onClick={() => onCartButtonClick(order.id, item.id)}>
              장바구니 담기
            </Button>
          </Styled.OrderWrapper>
        ))}
      </ItemGroup>
    </Styled.ItemGroupWrapper>
  ));

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문목록</PageTitle>
        </Styled.PageTitleWrapper>
        {orderList.reverse()}
      </Styled.PageWrapper>
      {isConfirmModalShown && (
        <ConfirmModal
          cancelButtonText="취소"
          confirmButtonText="확인"
          heading={confirmModalMessage}
          onCancel={hideConfirmModal}
          onClose={hideConfirmModal}
          onConfirm={confirmAction}
        />
      )}
      <Snackbar isShown={isSnackbarShown} animationDuration={300}>
        {snackbarMessage}
      </Snackbar>
    </Styled.OrderListPage>
  );
};

export default OrderListPage;
