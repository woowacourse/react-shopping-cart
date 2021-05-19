import { Redirect, useHistory } from 'react-router-dom';

import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ProductListItem from '../../components/commons/ProductListItem/ProductListItem';

import { PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { confirm } from '../../utils/confirm';
import { API } from '../../services/api';

import * as Styled from './ProductOrderPage.styles';
import { deleteCartItem } from '../../states/actions/cart';

const ProductOrderPage = () => {
  const history = useHistory<{ selectedItems: CartItem[] }>();
  const orderItems = history.location.state?.selectedItems;

  if (!orderItems) {
    return <Redirect to={PATH.ROOT} />;
  }

  const orderItemList = orderItems.map(orderItem => {
    return (
      <Styled.OrderItemWrapper key={orderItem.productId}>
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

  const onOrderItems = async () => {
    if (!confirm(`총 ${totalPrice}원을 결제하시겠습니까?`)) {
      return;
    }

    const responseResult = await API.ORDER(orderItems);

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('주문에 실패하였습니다.');
      return;
    }

    orderItems.forEach(item => {
      deleteCartItem(item);
    });

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
            onPayButtonClick={onOrderItems}
          />
        </Styled.PaymentCheckoutWrapper>
      </Styled.PageWrapper>
    </Styled.ProductOrderPage>
  );
};

export default ProductOrderPage;
