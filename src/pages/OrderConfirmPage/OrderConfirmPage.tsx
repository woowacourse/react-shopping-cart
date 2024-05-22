import { useRecoilValue } from 'recoil';
import { Navigate, useLoaderData } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TotalPriceContainer from '../../components/Container/TotalPriceContainer/TotalPriceContainer';
import CartItemContainer from '../../components/Container/CartItemContainer/CartItemContainer';
import DeliveryInfoContainer from '../../components/List/DeliveryInfoList/DeliveryInfoList';
import ShowModalButton from '../../components/Button/ShowModalButton/ShowModalButton';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalCountSelector } from '../../recoil/CartItem/selectors/selectedCartItemListTotalCountSelector';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';
import { applyCouponModalState } from '../../recoil/ApplyCouponModal/atoms/applyCouponModalState';
import { useToggleModal } from '../../hooks/useToggleModal';
import ApplyCouponModal from '../../modals/ApplyCouponModal/ApplyCouponModal';
import { Coupon } from '../../types/Coupon.type';

function OrderConfirmPage() {
  const couponList = useLoaderData() as Coupon[];

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
      <DeliveryInfoContainer />
      <TotalPriceContainer />
    </>
  );

  return (
    <>
      {isOpen && <ApplyCouponModal couponList={couponList} />}
      <Header />
      <S.Layout>
        <TitleContainer
          title="주문 확인"
          subTitle={`총 ${selectedItemList.length}종류의 상품 ${selectedCartItemTotalCount}개를 주문합니다. 최종 결제 금액을 확인해주세요.`}
        />
        {renderSelectedItemListSection()}
      </S.Layout>
      <SubmitButton isActive={false} content="결제하기" />
    </>
  );
}

export default OrderConfirmPage;
