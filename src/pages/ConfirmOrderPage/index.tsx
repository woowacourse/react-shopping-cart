import { PropsWithChildren } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import Layout from '../../layout';
import Header from '../../components/Header';
import BottomButton from '../../components/common/BottomButton';
import RecoilSuspense from '../../components/common/RecoilSuspense';

import {
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

const ConfirmOrderPage: React.FC<PropsWithChildren> = () => {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const totalQuantity = useRecoilValue(cartListTotalQuantity);

  return (
    <Layout
      header={<Header isShowLogo={false} />}
      bottom={
        <BottomButton onClick={() => {}} isDisabled={true}>
          결제하기
        </BottomButton>
      }
    >
      <RecoilSuspense loadable={cartList} fallback={<div>안쪽 로딩 중...</div>}>
        <ConfirmOrderContainer>
          <Title>주문 확인</Title>
          <OrderSummary>
            <p>{`총 ${cartList.contents.length}종류의 상품 ${totalQuantity}개를 주문합니다.`}</p>
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
};

export default ConfirmOrderPage;
