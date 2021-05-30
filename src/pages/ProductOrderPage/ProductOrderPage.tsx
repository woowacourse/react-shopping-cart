import { Redirect, useHistory } from 'react-router';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ListItem from '../../components/commons/ListItem/ListItem';
import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ProductOrderPage.styles';
import { confirm } from '../../utils/confirm';
import { requestAddOrder } from '../../apis';
import { alert } from '../../utils/alert';
import { CartItem } from '../../type';

const ProductOrderPage = () => {
  const history = useHistory<{ selectedCartItems: CartItem[] }>();
  const { selectedCartItems } = history.location.state;

  const tryAddOrder = async (cartItems: CartItem[]) => {
    try {
      await requestAddOrder(cartItems);
    } catch (error) {
      alert('주문 요청에 실패하였습니다.');
      return false;
    }

    return true;
  };

  const onOrderButtonClick = async () => {
    if (!confirm(`총 ${totalPrice}원을 결제하시겠습니까?`)) {
      return;
    }
    const isOrderSucceed = await tryAddOrder(selectedCartItems);
    if (!isOrderSucceed) {
      return;
    }
    history.push(PATH.ORDER_LIST);
  };

  const orderItemList = selectedCartItems.map(cartItem => {
    return (
      <Styled.OrderItemWrapper key={cartItem.id}>
        <ListItem
          size="SM"
          thumbnail={cartItem.thumbnail}
          name={cartItem.name}
          price={getMoneyString(cartItem.price)}
          quantity={cartItem.quantity}
        />
      </Styled.OrderItemWrapper>
    );
  });

  const totalPrice = getMoneyString(
    selectedCartItems.reduce((acc, cartItem) => {
      return acc + Number(cartItem.price) * Number(cartItem.quantity);
    }, 0)
  );

  if (!selectedCartItems) {
    return <Redirect to={PATH.ROOT} />;
  }

  return (
    <Styled.ProductOrderPage>
      <Styled.Header>
        <PageTitle>주문/결제</PageTitle>
      </Styled.Header>
      <Styled.PageWrapper>
        <Styled.Container>
          <Styled.OrderContainer>
            <Styled.OrderHeaderWrapper>
              <Styled.OrderHeader>배송상품 ({selectedCartItems.length}개)</Styled.OrderHeader>
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
