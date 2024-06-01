import { useNavigate } from 'react-router-dom';

import * as C from '../../components/common/commonStyles';
import * as S from './styles';

import CartList from '../../components/CartList';
import CheckoutSummary from '../../components/CheckoutSummary';
import CouponModal from '../../components/CouponModal';
import Header from '../../components/Header';
import { BackButton } from '../../components/Header/HeaderButton';
import ShippingInfo from '../../components/ShippingInfo';
import BottomButton from '../../components/common/BottomButton';
import Layout from '../../layout';

import useOrderInformation from '../../hooks/useOrderInformation';
import { useRecoilValue } from 'recoil';
import { totalDiscountSelector } from '../../recoil';
import { postOrders } from '../../api/order';

export default function OrderConfirmationPage() {
  const totalDiscount = useRecoilValue(totalDiscountSelector);
  const { selectedItems, totalPrice, totalQuantity, numOfTypes, shippingFee } =
    useOrderInformation();

  const navigate = useNavigate();

  const makeOrder = async () => {
    await postOrders(selectedItems.map((item) => item.id)).then(() => {
      navigate('/checkout');
    });
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
        <S.HeaderContainer>
          <C.Title>주문 확인</C.Title>

          <C.Description>
            {`총 ${numOfTypes}종류의 상품 ${totalQuantity}개를 주문합니다.`}
            <br />
            최종 결제 금액을 확인해 주세요.
          </C.Description>
        </S.HeaderContainer>

        <CartList summary items={selectedItems} />

        <CouponModal />

        <ShippingInfo />

        <CheckoutSummary
          totalPrice={totalPrice}
          coupon={totalDiscount}
          shippingFee={shippingFee}
        />
      </S.Wrapper>
    </Layout>
  );
}
