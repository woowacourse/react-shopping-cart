import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TotalPriceContainer from '../../components/Container/TotalPriceContainer/TotalPriceContainer';
import CartItemContainer from '../../components/CartItem/CartItemContainer';
import DeliveryInfoContainer from '../../components/Container/DeliveryInfoContainer/DeliveryInfoContainer';
import ShowModalButton from '../../components/Button/ShowModalButton/ShowModalButton';
import { selectedCartItemListState } from '../ShoppingCartPage/recoil/atom/selectedCartItemListState';
import { selectedCartItemListTotalCountSelector } from '../ShoppingCartPage/recoil/selector/selectedCartItemListTotalCountSelector';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';
import { applyCouponModalState } from '../../modals/ApplyCouponModal/recoil/atoms';
import { useToggleModal } from '../../modals/ApplyCouponModal/hooks/useToggleModal';
import ApplyCouponModal from '../../modals/ApplyCouponModal/ApplyCouponModal';

function OrderConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const selectedCartItemTotalCount = useRecoilValue(selectedCartItemListTotalCountSelector);

  const isOpen = useRecoilValue(applyCouponModalState);
  const { openModal } = useToggleModal();

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const renderSelectedItemListSection = () => (
    <>
      {selectedItemList.map((el) => (
        <CartItemContainer key={el.id} item={el} />
      ))}
      <ShowModalButton content="쿠폰 적용" onClick={openModal} />
      <DeliveryInfoContainer></DeliveryInfoContainer>
      <TotalPriceContainer />
    </>
  );

  return (
    <div>
      {isOpen && <ApplyCouponModal />}
      <Header />
      <S.Layout>
        <TitleContainer
          title="주문 확인"
          subTitle={`총 ${selectedItemList.length}종류의 상품 ${selectedCartItemTotalCount}개를 주문합니다. 최종 결제 금액을 확인해주세요.`}
        />
        {renderSelectedItemListSection()}
      </S.Layout>
      <SubmitButton isActive={false} content="결제하기" />
    </div>
  );
}

export default OrderConfirmPage;
