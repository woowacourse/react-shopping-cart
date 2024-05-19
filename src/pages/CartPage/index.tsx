import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  cartListState,
  cartListTotalPrice,
  shippingFee,
} from '../../recoil/selectors';

import Layout from '../../layout';
import BlankCart from '../../components/BlankCart';
import CartList from '../../components/CartList';
import CheckoutSummary from '../../components/CartList/CheckoutSummary';
import Header from '../../components/Header';
import BottomButton from '../../components/common/BottomButton';
import RecoilSuspense from '../../components/common/RecoilSuspense';
import Fallback from '../../components/common/Fallback';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import { Description, Title } from '../ConfirmOrderPage/styles';
import {
  CartHeaderContainer,
  CartListWrapper,
  CartPageContainer,
} from './styles';

export default function CartPage() {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const shipping = useRecoilValue(shippingFee);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    navigate('/confirm');
  };

  return (
    <RecoilSuspense
      loadable={cartList}
      fallback={
        <Fallback spinner={<LoadingSpinner />} message="로딩 중입니다..." />
      }
    >
      <Layout
        header={<Header isShowLogo={true} />}
        bottom={
          <BottomButton
            onClick={handleConfirmOrder}
            isDisabled={cartList.contents.length === 0}
          >
            주문 확인
          </BottomButton>
        }
      >
        {cartList.contents.length !== 0 ? (
          <CartPageContainer>
            <CartHeaderContainer>
              <Title>장바구니</Title>
              <Description>
                현재 {cartList.contents.length}종류의 아이템이 담겨져있습니다.
              </Description>
            </CartHeaderContainer>

            <CartListWrapper>
              <CartList items={cartList.contents} />
            </CartListWrapper>
            <CheckoutSummary totalPrice={totalPrice} shippingFee={shipping} />
          </CartPageContainer>
        ) : (
          <BlankCart />
        )}
      </Layout>
    </RecoilSuspense>
  );
}
