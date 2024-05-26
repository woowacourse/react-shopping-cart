import { useNavigate } from 'react-router-dom';

import * as C from '../../components/commonStyles';
import * as S from './styles';

import Header from '../../components/Header';
import { BackButton } from '../../components/Header/HeaderButton';
import BottomButton from '../../components/common/BottomButton';
import Layout from '../../layout';

import CouponModal from '../../components/CouponModal';
import ShippingInfo from '../../components/ShippingInfo';
import CheckoutSummary from '../../components/CheckoutSummary';

import { useRecoilValue } from 'recoil';
import {
  numberOfTypesSelector,
  selectedCartItemListSelector,
  shippingFeeSelector,
  totalPriceSelector,
  totalQuantitySelector,
} from '../../recoil';
import CartList from '../../components/CartList';

export default function OrderConfirmationPage() {
  const selectedItems = useRecoilValue(selectedCartItemListSelector);
  const numOfTypes = useRecoilValue(numberOfTypesSelector);
  const totalQuantity = useRecoilValue(totalQuantitySelector);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  const navigate = useNavigate();

  const makeOrder = () => {
    // TODO: /order fetch 요청
    navigate('/checkout');
  };

  return (
    <Layout
      header={<Header homeButton={<BackButton />} />}
      bottom={
        <BottomButton onClick={makeOrder} active>
          결제하기
        </BottomButton>
      }
    >
      <S.Wrapper>
        {/* Header */}
        <S.HeaderContainer>
          <C.Title>주문 확인</C.Title>

          <C.Description>
            {`총 ${numOfTypes}종류의 상품 ${totalQuantity}개를 주문합니다.`}
            <br />
            최종 결제 금액을 확인해 주세요.
          </C.Description>
        </S.HeaderContainer>

        <CartList summary items={selectedItems} />

        {/* 쿠폰 선택 모달 */}
        <CouponModal />

        {/* 배송 정보 */}
        <ShippingInfo />

        {/* 주문 요약 */}
        <CheckoutSummary
          totalPrice={totalPrice}
          coupon={0}
          shippingFee={shippingFee}
        />
      </S.Wrapper>
    </Layout>
  );
}
