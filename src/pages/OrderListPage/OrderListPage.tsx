import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useOrders from '../../hooks/orders';

import { getMoneyString } from '../../utils/format';
import { RootState } from '../../modules';
import { PATH, RESPONSE_RESULT } from '../../constants';
import { API } from '../../services/api';

import * as Styled from './OrderListPage.styles';

const OrderListPage = () => {
  const history = useHistory();
  const { orders, loading, responseOK } = useOrders();
  const { products } = useSelector((state: RootState) => state.product);

  if (products.length === 0) {
    return <Redirect to={PATH.ROOT} />;
  }

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

    const responseResult = await API.ADD_ONE_ITEM_IN_CART(product);

    if (responseResult === RESPONSE_RESULT.ALREADY_EXIST) {
      alert(`'${product?.name}'이(가) 이미 장바구니에 존재합니다.`);
      return;
    }

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('상품을 장바구니에 담지 못했습니다.');
      return;
    }

    alert(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
  };

  const orderList = orders.map(order => (
    <Styled.ItemGroupWrapper key={order.id}>
      <ItemGroup
        detailLinkButtonText="상세보기 >"
        orderNumber={String(order.id)}
        onDetailLinkClick={() => onMoveToOrderDetailPage(String(order.id))}
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
            <Button size="SM" onClick={() => onAddItemInCart(item.id)}>
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
