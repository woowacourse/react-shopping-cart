import { Redirect, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import PageTitle from '../../components/commons/PageTitle/PageTitle';
import OrderItemGroup from '../../components/commons/OrderItemGroup/OrderItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import leftArrowSVG from '../../assets/svgs/left-arrow.svg';
import TotalPrice from '../../components/OrderDetailPage/TotalPrice/TotalPrice';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useOrderDetail from '../../hooks/useOrderDetail';
import useSnackBar from '../../hooks/useSnackBar';
import useCart from '../../hooks/useCart';

import { COLORS, PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { API } from '../../services/api';

import * as Styled from './OrderDetailPage.styles';
import { RootState } from '../../states';

const OrderDetailPage = () => {
  const history = useHistory();
  const { products } = useSelector((state: RootState) => state.product);
  const { orderItems, loading, responseOK } = useOrderDetail();
  const { SnackBar, snackBarMessage, setSnackBarMessage } = useSnackBar();
  const { addCartItem } = useCart();
  const orderId = window.location.hash.split('/').slice(-1);

  if (products.length === 0) {
    return <Redirect to={PATH.ROOT} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  const onMoveToOrderListPage = () => {
    history.push(PATH.ORDER_LIST);
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

  const orderItemList = orderItems.map(orderItem => (
    <Styled.OrderWrapper key={orderItem.productId}>
      <ProductListItem
        size="MD"
        productName={orderItem.name}
        productPrice={orderItem.price}
        productQuantity={orderItem.quantity}
        productThumbnail={orderItem.thumbnail}
      />
      <Button size="SM" onClick={() => onAddItemInCart(orderItem.productId)}>
        장바구니 담기
      </Button>
    </Styled.OrderWrapper>
  ));

  const totalPrice = orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);

  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문내역상세</PageTitle>
        </Styled.PageTitleWrapper>
        <Styled.ItemGroupWrapper>
          <OrderItemGroup orderNumber={String(orderId)}>{orderItemList}</OrderItemGroup>
        </Styled.ItemGroupWrapper>
        <Styled.PageBottom>
          <Button size="MD" backgroundColor={COLORS.BROWN_500} onClick={onMoveToOrderListPage}>
            <img src={leftArrowSVG} alt="주문목록 돌아가기" />
            &nbsp;&nbsp;주문목록 돌아가기
          </Button>
          <TotalPrice title="결제금액 정보" priceLabel="총 결제금액" price={getMoneyString(totalPrice)} />
        </Styled.PageBottom>
      </Styled.PageWrapper>
      <SnackBar key={Math.random()} message={snackBarMessage} setMessage={setSnackBarMessage} />
    </Styled.OrderListPage>
  );
};

export default OrderDetailPage;
