import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import type { Coupon } from '../../types/Coupon.type';
import Header from '../../components/Header/Header';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import TotalPriceContainer from '../../components/ShoppingCartPage/TotalPriceContainer/TotalPriceContainer';
import CouponModal from '../../components/OrderConfirmPage/CouponModal/CouponModal';
import { selectedCartItemListState, isSigolState } from '../../recoil/atoms/atoms';
import { cartOrderTotalCountSelector } from '../../recoil/selectors/selectors';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';
import { useState } from 'react';

function OrderConfirmPage() {
  const couponList = useLoaderData() as Coupon[];

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isSigol, setIsSigol] = useRecoilState(isSigolState);

  const selectedItemList = useRecoilValue(selectedCartItemListState);
  const orderTotalCount = useRecoilValue(cartOrderTotalCountSelector);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const handleIsSigol = () => setIsSigol((prev) => !prev);

  return (
    <div>
      <Header />
      <S.Main>
        <TitleContainer
          title="주문 확인"
          subTitle={`총 ${selectedItemList.length}종류의 상품 ${orderTotalCount}개를 주문합니다.`}
        />
        <S.SelectedCartItemContainer>
          {selectedItemList.map((item) => (
            <CartItem key={item.id} item={item} isConfirm={true} />
          ))}
        </S.SelectedCartItemContainer>
        <S.CouponModalButton type="button" onClick={() => setIsCouponModalOpen(true)}>
          쿠폰 적용
        </S.CouponModalButton>
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
