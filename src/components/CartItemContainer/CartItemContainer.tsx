import { useRecoilValue } from 'recoil';
import * as Styled from './style';
import { selectedSomeCartItemsSelector } from '../../recoil/selectedCardItems';
import { useNavigate } from 'react-router-dom';
import CartItemList from '../CartItemList/CartItemList';
import { fetchedCartItemsSelector } from '../../recoil/fetch';
import Title from '../common/Title/Title';
import TotalPaymentInfo from '../common/TotalPaymentInfo/TotalPaymentInfo';
import OrderButton from '../common/OrderButton/OrderButton';

const CartItemContainer = () => {
  const navigator = useNavigate();
  const cartItems = useRecoilValue(fetchedCartItemsSelector);

  const hasSomeCartItem = !!cartItems.length;
  const isSomeCartItemSelected = useRecoilValue(selectedSomeCartItemsSelector);
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  return (
    <>
      <Styled.Container>
        {hasSomeCartItem ? (
          <>
            <Title
              title="장바구니"
              caption={`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}
            />
            <CartItemList />
            <TotalPaymentInfo />
          </>
        ) : (
          <>
            <Title title="장바구니" />
            <Styled.Content>
              <Styled.EmptyCartMessage>
                장바구니에 담은 상품이 없습니다.
              </Styled.EmptyCartMessage>
            </Styled.Content>
          </>
        )}
      </Styled.Container>
      <OrderButton
        onClick={() => navigator('/orderConfirmation')}
        isOrderable={isOrderable}
      >
        주문 확인
      </OrderButton>
    </>
  );
};

export default CartItemContainer;
