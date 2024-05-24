import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { ROUTES } from '../../constants/routes';
import Button from '../../components/common/Button/Button';
import CenterBox from '../../components/common/CenterBox/CenterBox';
import Text from '../../components/common/Text/Text';
import { useRecoilValue } from 'recoil';
import { finalCartPriceState } from '../../recoil/price/finalCartPriceState';
import { selectedCartItemListState } from '../../recoil/selectedCartItemList/selectedCartItemList';
import { totalCartItemQuantityState } from '../../recoil/cartItem/totalCartItemQuantityState';
import { requestOrders } from '../../apis/requests/order';

const CartOrderCompletePage = () => {
  const finalCartPrice = useRecoilValue(finalCartPriceState);
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalQuantity = useRecoilValue(totalCartItemQuantityState);

  const navigate = useNavigate();

  const completeOrder = async () => {
    navigate(ROUTES.CART_ORDERS);
    requestOrders(selectedCartItemList.map(({ cartItemId }) => cartItemId));
  };

  return (
    <>
      <Header />
      <CenterBox direction="column" gap="20px">
        <Text size="l" weight="l">
          결제 확인
        </Text>
        <Text size="s" weight="m" style={{ textAlign: 'center' }}>
          총 {selectedCartItemList.length}종류의 상품 {totalQuantity}개를 주문했습니다.
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
      </CenterBox>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        onClick={completeOrder}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};

export default CartOrderCompletePage;
