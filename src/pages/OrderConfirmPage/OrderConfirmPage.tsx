import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import Header, { GoBackButton } from '../../components/Header/Header';
import TitleContainer, { SubTitle } from '../../components/common/TitleContainer/TitleContainer';
import Button from '../../components/common/Button/Button';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import CartItem from '../../components/ShoppingCart/CartItem/CartItem';
import CouponModal from '../../components/Coupon/CouponModal/CouponModal';
import TotalPriceContainer from '../../components/ShoppingCart/TotalPriceContainer/TotalPriceContainer';
import type { Coupon } from '../../types/Coupon.type';
import { selectedCartItemListState, isSigolState } from '../../recoil/CartItem/atoms/atoms';
import { totalOrderCountSelector } from '../../recoil/CartItem/selectors/selectors';
import { selectedCouponListState } from '../../recoil/Coupon/atoms/atoms';
import useCouponModal from '../../hooks/useCouponModal';
import { addOrder } from '../../apis';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';

function OrderConfirmPage() {
  const couponList = useLoaderData() as Coupon[];

  const navigate = useNavigate();

  const [isSigol, setIsSigol] = useRecoilState(isSigolState);

  const resetIsSigol = useResetRecoilState(isSigolState);
  const resetSelectedCouponList = useResetRecoilState(selectedCouponListState);

  const selectedItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderCount = useRecoilValue(totalOrderCountSelector);

  const { isCouponModalOpen, openModal, closeModal } = useCouponModal();

  const handleHeaderClick = () => {
    resetIsSigol();
    resetSelectedCouponList();

    navigate(-1);
  };

  const handleIsSigol = () => setIsSigol((prev) => !prev);

  const handleSubmitButtonClick = async () => {
    try {
      await addOrder(selectedItemList);
      navigate(PATHS.PAYMENT_CONFIRM);
    } catch {
      navigate(PATHS.ERROR);
    }
  };

  if (selectedItemList.length === 0) return <Navigate to={PATHS.ERROR} />;

  return (
    <div>
      <Header>
        <GoBackButton onClick={handleHeaderClick} />
      </Header>
      <S.Main>
        <TitleContainer title="주문 확인">
          <SubTitle>
            총 {selectedItemList.length}종류의 상품 {totalOrderCount}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </SubTitle>
        </TitleContainer>
        <S.SelectedCartItemContainer>
          {selectedItemList.map((item) => (
            <CartItem key={item.id} item={item} isConfirm={true} />
          ))}
        </S.SelectedCartItemContainer>
        <Button type="button" content="쿠폰 적용" onClick={openModal} />
        <S.CartInfoContainer>
          <S.CartInfoTitle>배송 정보</S.CartInfoTitle>
          <CheckBox id="배송 정보" text="제주도 및 도서 산간 지역" isChecked={isSigol} onChange={handleIsSigol} />
        </S.CartInfoContainer>
        <TotalPriceContainer isConfirm={true} />
      </S.Main>
      <SubmitButton isActive={true} content="결제하기" onClick={handleSubmitButtonClick} />
      {isCouponModalOpen && <CouponModal couponList={couponList} isOpen={isCouponModalOpen} close={closeModal} />}
    </div>
  );
}

export default OrderConfirmPage;
