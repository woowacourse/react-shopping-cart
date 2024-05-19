import styled from 'styled-components';
import Header from '../components/Header/Header';
import Text from '../components/common/Text/Text';
import { useLocation } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import { useRecoilValue } from 'recoil';
import { totalCartItemQuantitySelector } from '../recoil/cartItem/states';
import { finalCartPriceSelector } from '../recoil/price/states';
import { CartItem } from '../apis/cartItem/cartItem.type';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 30px 20px 80px 20px;
  min-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const PriceContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const ConfirmPurchasePage = () => {
  const location = useLocation();
  const state: CartItem[] = location.state;
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantitySelector);
  const finalCartPrice = useRecoilValue(finalCartPriceSelector);

  return (
    <>
      <Header type="back" />
      <CartPageContainer>
        <Text size="l" weight="l">
          주문 확인
        </Text>
        <Text size="s" weight="m">
          총 {state.length}종류의 상품 {totalCartItemQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <PriceContainer>
          <Text size="m" weight="l">
            총 결제 금액
          </Text>
          <Text size="l" weight="l">
            {finalCartPrice.toLocaleString('ko-kr')}원
          </Text>
        </PriceContainer>
      </CartPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: 'inherit' }}
        isDisabled
      >
        결제 확인
      </Button>
    </>
  );
};
export default ConfirmPurchasePage;
