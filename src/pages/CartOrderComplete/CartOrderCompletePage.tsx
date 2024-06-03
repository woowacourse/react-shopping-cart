import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { ROUTES } from '../../constants/routes';
import Button from '../../components/common/Button/Button';
import CenterBox from '../../components/common/CenterBox/CenterBox';
import Text from '../../components/common/Text/Text';

const CartOrderCompletePage = () => {
  const location = useLocation();
  const { selectedCartItemLength, totalQuantity, finalCartPrice } = location.state;

  const navigate = useNavigate();

  const moveToCartOrdersPage = () => {
    navigate(ROUTES.CART_ORDERS);
  };

  return (
    <>
      <Header />
      <CenterBox direction="column" gap="20px">
        {totalQuantity !== 0 ? (
          <>
            <Text size="l" weight="l">
              결제 확인
            </Text>
            <Text size="s" weight="m" style={{ textAlign: 'center' }}>
              총 {selectedCartItemLength}종류의 상품 {totalQuantity}개를 주문했습니다.
              <br />
              최종 결제 금액을 확인해 주세요.
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '6px' }}>
              <Text size="m" weight="l">
                총 결제 금액
              </Text>
              <Text size="l" weight="l">
                {finalCartPrice.toLocaleString('ko-KR')}원
              </Text>
            </div>
          </>
        ) : (
          <>
            <Text size="l" weight="l">
              잘못된 접근입니다.
            </Text>
          </>
        )}
      </CenterBox>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        onClick={moveToCartOrdersPage}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};

export default CartOrderCompletePage;
