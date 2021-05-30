import { useHistory, Redirect } from 'react-router-dom';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ListItem from '../../components/commons/ListItem/ListItem';
import Button from '../../components/commons/Button/Button';
import useOrders from '../../hooks/useOrders';
import { getMoneyString } from '../../utils/format';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { PATH } from '../../constants';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import { confirm } from '../../utils/confirm';
import * as Styled from './OrderListPage.styles';
import { requestAddProductToCart } from '../../apis';
import { alert } from '../../utils/alert';
import { Product } from '../../type';

const OrderListPage = () => {
  const { orders, loading, responseOK } = useOrders();
  const { products } = useSelector((state: RootState) => state.products);
  const history = useHistory();

  const onCartButtonClick = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);
    if (!confirm(`'${product?.name}'을(를) 장바구니에 담으시겠습니까?`)) {
      return;
    }

    if (!product) {
      return;
    }

    try {
      await requestAddProductToCart(product.id);
    } catch (error) {
      alert('상품을 장바구니에 담지 못했습니다.');
    }
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
            <Button size="SM" onClick={() => onCartButtonClick(item.id)}>
              장바구니 담기
            </Button>
          </Styled.OrderWrapper>
        ))}
      </ItemGroup>
    </Styled.ItemGroupWrapper>
  ));

  if (products.length === 0) {
    return <Redirect to={PATH.ROOT} />;
  }

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
    </Styled.OrderListPage>
  );
};

export default OrderListPage;
