import { Redirect, useHistory } from 'react-router';
import PageTitle from '../../components/commons/PageTitle/PageTitle';
import PaymentCheckout from '../../components/commons/PaymentCheckout/PaymentCheckout';
import ListItem from '../../components/commons/ListItem/ListItem';
import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';
import * as Styled from './ProductOrderPage.styles';
import { requestAddOrder } from '../../apis';
import { CartItem } from '../../type';
import useConfirmModal from '../../hooks/layout/useConfirmModal';
import ConfirmModal from '../../components/commons/Modal/ConfirmModal/ConfirmModal';
import useSnackbar from '../../hooks/layout/useSnackbar';
import { Snackbar } from '../../components/commons/Snackbar/Snackbar.styles';

const ProductOrderPage = () => {
  const history = useHistory<{ selectedCartItems: CartItem[] }>();

  const { isSnackbarShown, snackbarMessage, showSnackbar } = useSnackbar();

  const {
    confirmModalMessage,
    isConfirmModalShown,
    changeConfirmAction,
    confirmAction,
    hideConfirmModal,
    showConfirmModal,
  } = useConfirmModal();

  if (!history.location.state) {
    return <Redirect to={PATH.ROOT} />;
  }

  const { selectedCartItems } = history.location.state;

  const onOrderButtonClick = async () => {
    showConfirmModal(`총 ${totalPrice}원을 결제하시겠습니까?`);
    changeConfirmAction(async () => {
      try {
        await requestAddOrder(selectedCartItems);
        history.push(PATH.ORDER_LIST);
      } catch (error) {
        showSnackbar(error.message);
      }
    });
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
    </Styled.ProductOrderPage>
  );
};

export default ProductOrderPage;
