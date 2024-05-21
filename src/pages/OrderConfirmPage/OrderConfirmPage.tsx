import { useRecoilValue } from 'recoil';
import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CartItem from '../../components/ShoppingCartPage/CartItem/CartItem';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CheckBox from '../../components/common/CheckBox/CheckBox';
import TotalPriceContainer from '../../components/ShoppingCartPage/TotalPriceContainer/TotalPriceContainer';
import { selectedCartItemListState } from '../../recoil/atoms/atoms';
import { cartOrderTotalCountSelector } from '../../recoil/selectors/selectors';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';

function OrderConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const orderTotalCount = useRecoilValue(cartOrderTotalCountSelector);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

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
            <CartItem item={item} isConfirm={true} />
          ))}
        </S.SelectedCartItemContainer>
        <S.CouponModalButton type="button">쿠폰 적용</S.CouponModalButton>
        <S.CartInfoContainer>
          <S.CartInfoTitle>배송 정보</S.CartInfoTitle>
          <CheckBox id="배송 정보" text="제주도 및 도서 산간 지역" isChecked={false} />
        </S.CartInfoContainer>
        <TotalPriceContainer isConfirm={true} />
      </S.Main>
      <Link to={PATHS.PAYMENT_CONFIRM}>
        <SubmitButton isActive={true} content="결제하기" />
      </Link>
    </div>
  );
}

export default OrderConfirmPage;
