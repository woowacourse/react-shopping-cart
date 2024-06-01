import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import Layout from '../../layout';
import Header from '../../components/Header';
import BottomButton from '../../components/common/BottomButton';
import { HomeButton } from '../../components/Header/HeaderButton';

import BlankCart from '../../components/BlankCart';
import CartList from '../../components/CartList';
import CheckoutSummary from '../../components/CheckoutSummary';
import Fallback from '../../components/common/Fallback';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import RecoilSuspense from '../../components/common/RecoilSuspense';

import * as C from '../../components/common/commonStyles';
import * as S from './styles';

import { cartListSelector } from '../../recoil';
import useOrderInformation from '../../hooks/useOrderInformation';

export default function CartPage() {
  const cartList = useRecoilValueLoadable(cartListSelector);
  const { totalPrice, totalQuantity, shippingFee } = useOrderInformation();

  const navigate = useNavigate();

  const moveToConfirmPage = () => {
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
            active={cartList.contents.length !== 0 && totalQuantity !== 0}
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
            <CheckoutSummary
              totalPrice={totalPrice}
              shippingFee={shippingFee}
            />
          </S.Wrapper>
        ) : (
          <BlankCart />
        )}
      </Layout>
    </RecoilSuspense>
  );
}
