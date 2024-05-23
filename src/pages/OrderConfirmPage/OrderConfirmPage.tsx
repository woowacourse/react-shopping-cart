import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import Header, { GoBackButton } from '../../components/Header/Header';
import Button from '../../components/common/Button/Button';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';
import TitleContainer, { SubTitle } from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import TotalPriceContainer from '../../components/common/TotalPriceContainer/TotalPriceContainer';
import CouponModal from '../../components/OrderConfirmPage/CouponModal/CouponModal';
import type { Coupon } from '../../types/Coupon.type';
import { selectedCartItemListState, isSigolState } from '../../recoil/CartItem/atoms/atoms';
import { selectedCouponListState } from '../../recoil/Coupon/atoms/atoms';
import { totalOrderCountSelector } from '../../recoil/CartItem/selectors/selectors';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';

function OrderConfirmPage() {
  const couponList = useLoaderData() as Coupon[];
  const navigate = useNavigate();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isSigol, setIsSigol] = useRecoilState(isSigolState);

  const setSelectedCouponList = useSetRecoilState(selectedCouponListState);

  const selectedItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderCount = useRecoilValue(totalOrderCountSelector);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const handleIsSigol = () => setIsSigol((prev) => !prev);

  const clearStorage = () => {
    setIsSigol(false);
    setSelectedCouponList([]);
  };

  const handleHeaderClick = () => {
    clearStorage();
    navigate(-1);
  };

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
        <Button type="button" content="쿠폰 적용" onClick={() => setIsCouponModalOpen(true)} />
        <S.CartInfoContainer>
          <S.CartInfoTitle>배송 정보</S.CartInfoTitle>
          <CheckBox id="배송 정보" text="제주도 및 도서 산간 지역" isChecked={isSigol} onChange={handleIsSigol} />
        </S.CartInfoContainer>
        <TotalPriceContainer isConfirm={true} />
      </S.Main>
      <Link to={PATHS.PAYMENT_CONFIRM}>
        <SubmitButton isActive={true} content="결제하기" />
      </Link>
      {isCouponModalOpen && (
        <CouponModal couponList={couponList} isOpen={isCouponModalOpen} close={() => setIsCouponModalOpen(false)} />
      )}
    </div>
  );
}

export default OrderConfirmPage;
