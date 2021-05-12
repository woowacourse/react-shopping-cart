import { useHistory } from 'react-router';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ProductOrderPage.styles';
import { confirm } from '../../utils/confirm';
import { requestOrderAdd } from '../../apis';
import { alert } from '../../utils/alert';
import { requestCartItemsDelete } from '../../apis/cart';

const ProductOrderPage = () => {
  const history = useHistory<{ selectedItems: CartItem[] }>();
  const { selectedItems: orderItems } = history.location.state;

  const orderItemList = orderItems.map(orderItem => {
    return (
      <Styled.OrderItemWrapper key={orderItem.id}>
        <ProductListItem
          size="SM"
          productThumbnail={orderItem.thumbnail}
          productName={orderItem.name}
          productPrice={getMoneyString(orderItem.price)}
          productQuantity={orderItem.quantity}
        />
      </Styled.OrderItemWrapper>
    );
  });

  const totalPrice = getMoneyString(
    orderItems.reduce((acc, orderItem) => {
      return acc + Number(orderItem.price) * Number(orderItem.quantity);
    }, 0)
  );

  const tryAddOrder = async (orderItems: CartItem[]) => {
    try {
      await requestOrderAdd(orderItems);
    } catch (error) {
      alert('주문 요청에 실패하였습니다.');
      return false;
    }

    return true;
  };

  const tryDeleteOrderedCartItems = async (idList: Array<CartItem['id']>) => {
    try {
      await requestCartItemsDelete(idList);
    } catch (error) {
      alert('기존의 장바구니 상품들을 삭제하는데 실패하였습니다.');
      return false;
    }

    return true;
  };

  const onOrderButtonClick = async () => {
    if (!confirm(`총 ${totalPrice}원을 결제하시겠습니까?`)) {
      return;
    }
    const isOrderSucceed = await tryAddOrder(orderItems);
    if (!isOrderSucceed) {
      return;
    }
    const orderItemIdList = orderItems.map(orderItem => orderItem.id);
    const isOrderedCarItemDeleted = await tryDeleteOrderedCartItems(orderItemIdList);
    if (!isOrderedCarItemDeleted) {
      return;
    }
    history.push(PATH.ORDER_LIST);
  };

  return (
    <Styled.ProductOrderPage>
      <Styled.Header>
        <PageTitle>주문/결제</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.OrderContainer>
            <Styled.OrderHeaderWrapper>
              <Styled.OrderHeader>배송상품 ({orderItems.length}개)</Styled.OrderHeader>
            </Styled.OrderHeaderWrapper>
            <Styled.OrderItemList>{orderItemList}</Styled.OrderItemList>
          </Styled.OrderContainer>
        </Styled.Container>
        <Styled.PaymentCheckoutWrapper>
          <PaymentCheckout
            title="결제예상금액"
            priceLabel="결제예상금액"
            price={totalPrice}
            buttonText={`${totalPrice}원 결제하기`}
            onButtonClick={onOrderButtonClick}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ProductOrderPage>
  );
};

export default ProductOrderPage;
