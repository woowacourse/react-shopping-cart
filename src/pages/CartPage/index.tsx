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

import * as C from '../commonStyles';
import * as S from './styles';
import { HomeButton } from '../../components/Header/HeaderButton';

export default function CartPage() {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const shipping = useRecoilValue(shippingFee);
  const navigate = useNavigate();

  const moveToConfirmPage = async () => {
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
        header={<Header homeButton={<HomeButton />} />}
        bottom={
          <BottomButton
            onClick={moveToConfirmPage}
            active={cartList.contents.length !== 0}
          >
            주문 확인
          </BottomButton>
        }
      >
        {cartList.contents.length !== 0 ? (
          <S.Wrapper>
            <S.CartHeaderContainer>
              <C.Title>장바구니</C.Title>
              <C.Description>
                현재 {cartList.contents.length}종류의 아이템이 담겨져있습니다.
              </C.Description>
            </S.CartHeaderContainer>

            <S.CartListWrapper>
              <CartList items={cartList.contents} />
            </S.CartListWrapper>
            <CheckoutSummary totalPrice={totalPrice} shippingFee={shipping} />
          </S.Wrapper>
        ) : (
          <BlankCart />
        )}
      </Layout>
    </RecoilSuspense>
  );
}
