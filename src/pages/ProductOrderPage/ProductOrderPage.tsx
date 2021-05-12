import axios from 'axios';
import { useHistory } from 'react-router';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';
import { PATH, URL, STATUS_CODE } from '../../constants';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ProductOrderPage.styles';

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

  const onOrderButtonClick = async () => {
    try {
      let response = await axios.post(URL.ORDERS, { orderItems });
      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('주문에 실패하였습니다.');
      }

      orderItems.forEach(async item => {
        response = await axios.delete(`${URL.CART}/${item.id}`);
        if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
          throw new Error('장바구니 아이템 삭제에 실패하였습니다');
        }
      });

      history.push(PATH.ORDER_LIST);
    } catch (error) {
      console.error(error);
    }
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
