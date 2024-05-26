import { isIslandOrMountainState, selectedCouponsState } from '../../../recoil/atoms';

import ConfirmationContainer from './ConfirmationContainer/ConfirmationContainer';
import ENDPOINTS from '../../../constants/endpoints';
import FooterButton from '../../common/FooterButton/FooterButton';
import Header from '../../common/Header/Header';
import PreviousPageButton from '../../common/PreviousPageButton/PreviousPageButton';
import { Suspense } from 'react';
import TitleContainer from '../../common/TitleContainer/TitleContainer';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const setIsIslandOrMountain = useSetRecoilState(isIslandOrMountainState);
  const setSelectedCoupon = useSetRecoilState(selectedCouponsState);
  const handleClickPreviousButton = () => {
    navigate(ENDPOINTS.shoppingCart);
    setIsIslandOrMountain(false);
  };

  const handleClickConfirmButton = () => {
    setSelectedCoupon([]);
    navigate(ENDPOINTS.paymentPage, { state: { lastPage: ENDPOINTS.orderConfirmation } });
  };

  return (
    <>
      <Header>
        <PreviousPageButton onClick={handleClickPreviousButton} />
      </Header>
      <Content>
        <TitleContainer title="주문확인" />
        <Suspense>
          <ConfirmationContainer />
        </Suspense>
      </Content>
      <FooterButton onClick={handleClickConfirmButton} buttonText="결제하기" />
    </>
  );
}

const Content = styled.section({
  padding: '36px 24px',
  height: '100%',
  flex: '1 0 auto',
});
