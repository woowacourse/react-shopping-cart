import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import useOrders from '../../hooks/orders';
import { getMoneyString } from '../../utils/format';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import axios from 'axios';
import { PATH, STATUS_CODE, URL } from '../../constants';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import * as Styled from './OrderListPage.styles';

const OrderListPage = () => {
  const { orders, loading, responseOK } = useOrders();
  const { products } = useSelector((state: RootState) => state.product);
  const history = useHistory();

  const onCartButtonClick = async (id: Product['id']) => {
    try {
      const product = products.find(product => product.id === id);
      const response = await axios.post(URL.CART, { ...product, quantity: '1' });
      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('상품을 장바구니에 담지 못했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  const onOrderDetailLinkClick = (orderId: string) => {
    history.push(`${PATH.ORDER_DETAIL}/${orderId}`);
  };

  const orderList = orders.map(order => (
    <Styled.ItemGroupWrapper key={order.id}>
      <ItemGroup
        detailLinkButtonText="상세보기 >"
        orderNumber={String(order.id)}
        onDetailLinkClick={() => onOrderDetailLinkClick(String(order.id))}
      >
        {order.orderItems.map(item => (
          <Styled.OrderWrapper key={item.id}>
            <ProductListItem
              size="MD"
              productThumbnail={item.thumbnail}
              productName={item.name}
              productPrice={getMoneyString(item.price)}
              productQuantity={item.quantity}
            />
            <Button size="SM" onClick={() => onCartButtonClick(item.id)}>
              장바구니 담기
            </Button>
          </Styled.OrderWrapper>
        ))}
      </ItemGroup>
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
    </Styled.OrderListPage>
  );
};

export default OrderListPage;
