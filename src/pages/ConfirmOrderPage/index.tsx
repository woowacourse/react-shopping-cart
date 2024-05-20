import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import Header from '../../components/Header';
import BottomButton from '../../components/common/BottomButton';
import Fallback from '../../components/common/Fallback';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import RecoilSuspense from '../../components/common/RecoilSuspense';
import Layout from '../../layout';

import {
  cartListNumberOfTypes,
  cartListState,
  cartListTotalPrice,
  cartListTotalQuantity,
} from '../../recoil/selectors';

import {
  ConfirmOrderContainer,
  OrderSummary,
  SubTitle,
  Title,
  TotalPrice,
} from './styles';

export default function ConfirmOrderPage() {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const totalQuantity = useRecoilValue(cartListTotalQuantity);
  const numOfTypes = useRecoilValue(cartListNumberOfTypes);

  return (
    <Layout
      header={<Header isShowLogo={false} />}
      bottom={
        <BottomButton onClick={() => {}} isDisabled={true}>
          결제하기
        </BottomButton>
      }
    >
      <RecoilSuspense
        loadable={cartList}
        fallback={
          <Fallback
            spinner={<LoadingSpinner />}
            message="주문 정보 로딩 중입니다. 잠시만 기다려 주세요."
          />
        }
      >
        <ConfirmOrderContainer>
          <Title>주문 확인</Title>
          <OrderSummary>
            <p>{`총 ${numOfTypes}종류의 상품 ${totalQuantity}개를 주문합니다.`}</p>
            <p>최종 결제 금액을 확인해 주세요.</p>
          </OrderSummary>

          <TotalPrice>
            <SubTitle>총 결제 금액</SubTitle>
            <Title>{`${totalPrice.toLocaleString()}원`}</Title>
          </TotalPrice>
        </ConfirmOrderContainer>
      </RecoilSuspense>
    </Layout>
  );
}
