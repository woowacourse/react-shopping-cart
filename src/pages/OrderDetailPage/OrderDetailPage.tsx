import * as Styled from './OrderDetailPage.styles';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import ItemGroup from '../../components/commons/ItemGroup/ItemGroup';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import Button from '../../components/commons/Button/Button';
import leftArrowSVG from '../../assets/svgs/left-arrow.svg';
import { COLORS, PATH, STATUS_CODE, URL } from '../../constants';
import TotalPrice from '../../components/OrderDetailPage/TotalPrice/TotalPrice';
import useOrderDetail from '../../hooks/orderDetail';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { confirm } from '../../utils/confirm';
import { getMoneyString } from '../../utils/format';

const OrderDetailPage = () => {
  const orderId = window.location.hash.split('/').slice(-1);
  const history = useHistory();
  const { products } = useSelector((state: RootState) => state.product);
  const { orderItems, loading, responseOK } = useOrderDetail();

  if (products.length === 0) {
    return <Redirect to={PATH.ROOT} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="주문 목록 정보를 불러올 수 없습니다." />;
  }

  const onCartButtonClick = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);

    if (!confirm(`'${product?.name}'을(를) 장바구니에 담으시겠습니까?`)) {
      return;
    }
    try {
      const response = await axios.post(URL.CART, { ...product, quantity: '1' });
      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('상품을 장바구니에 담지 못했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onOrderListLinkButtonClick = () => {
    history.push(PATH.ORDER_LIST);
  };

  const orderItemList = orderItems.map(orderItem => (
    <Styled.OrderWrapper key={orderItem.id}>
      <ProductListItem
        size="MD"
        productName={orderItem.name}
        productPrice={orderItem.price}
        productQuantity={orderItem.quantity}
        productThumbnail={orderItem.thumbnail}
      />
      <Button size="SM" onClick={() => onCartButtonClick(orderItem.id)}>
        장바구니 담기
      </Button>
    </Styled.OrderWrapper>
  ));

  const totalPrice = getMoneyString(
    orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
  );

  return (
    <Styled.OrderListPage>
      <Styled.PageWrapper>
        <Styled.PageTitleWrapper>
          <PageTitle>주문내역상세</PageTitle>
        </Styled.PageTitleWrapper>
        <Styled.ItemGroupWrapper>
          <ItemGroup orderNumber={String(orderId)}>{orderItemList}</ItemGroup>
        </Styled.ItemGroupWrapper>
        <Styled.PageBottom>
          <Button size="MD" backgroundColor={COLORS.BROWN_500} onClick={onOrderListLinkButtonClick}>
            <img src={leftArrowSVG} alt="주문목록 돌아가기" />
            &nbsp;&nbsp;주문목록 돌아가기
          </Button>
          <TotalPrice title="결제금액 정보" priceLabel="총 결제금액" price={totalPrice} />
        </Styled.PageBottom>
      </Styled.PageWrapper>
    </Styled.OrderListPage>
  );
};

export default OrderDetailPage;
