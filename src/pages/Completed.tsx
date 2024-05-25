import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { URL_PATH } from '../constants/UrlPath';
import { MESSAGES } from '../constants/Messages';
import { fetchOrder } from '../api';
import { ResetAllState } from '../recoil/useRecoilCallback';
import { useLocation, useNavigate } from 'react-router-dom';

const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
`;

const TotalAmountLabel = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
`;

const TotalAmountStyle = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;
`;

function Completed() {
  const {
    state: {
      totalItemTypeCount,
      totalCount,
      calculatedTotalAmount,
      checkedItemId,
    },
  } = useLocation();

  const updateOrder = async () => {
    await fetchOrder(checkedItemId);
  };

  const navigate = useNavigate();
  const handleFooterClick = () => {
    navigate(URL_PATH.cart);
  };
  updateOrder();
  ResetAllState();
  return (
    <>
      <Header headerIconType="back" />
      <CompletedContainer>
        <Title>주문 확인</Title>
        <SubTitle>
          총 {totalItemTypeCount}종류의 상품 {totalCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </SubTitle>
        <TotalAmountLabel>총 결제 금액</TotalAmountLabel>
        <TotalAmountStyle>
          {calculatedTotalAmount.toLocaleString()}원
        </TotalAmountStyle>
      </CompletedContainer>

      <Footer
        value={MESSAGES.returnCart}
        isDisabled={false}
        onClick={handleFooterClick}
      />
    </>
  );
}

export default Completed;
