import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import { Back } from '../../../assets';
import { useNavigate } from 'react-router';
import PayButton from '../../../components/PayButton/PayButton';
import { TEXT } from '../../../constants/text';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';

function OrderCheck() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <HeaderButton onClick={() => navigate(-1)}>
          <img src={Back} alt="뒤로가기 버튼" />
        </HeaderButton>
      </Header>
      <ContainerLayout>
        <CartListTitle
          title={TEXT.ORDER_CHECK}
          description={`총 [동적연결필요]종류의 상품 [동적연결필요]개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
        />
      </ContainerLayout>
      <PayButton />
    </>
  );
}

export default OrderCheck;
