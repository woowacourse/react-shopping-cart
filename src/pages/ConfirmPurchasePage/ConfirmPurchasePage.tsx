import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Text from '../../components/common/Text/Text';
import Button from '../../components/common/Button/Button';
import { useRecoilValue } from 'recoil';
import { cartItemListAtom } from '../../recoil/cartItemList/states';
import ConfirmPurchasePageLoader from './ConfirmPurchasePageLoader';
import { selectedCartItemIdListAtom } from '../../recoil/selectedCartItemIdList/states';

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
  const cartItemList = useRecoilValue(cartItemListAtom);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListAtom);

  const selectedCartItemList = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));
  const totalCartItemQuantity = selectedCartItemList.reduce(
    (totalQuantity, { quantity }) => totalQuantity + quantity,
    0,
  );
  const finalCartPrice = selectedCartItemList.reduce(
    (totalCartPrice, { quantity, product }) => totalCartPrice + quantity * product.price,
    0,
  );

  return (
    <>
      <Header type="back" />
      <ConfirmPurchasePageLoader>
        <CartPageContainer>
          <Text size="l" weight="l">
            주문 확인
          </Text>
          <Text size="s" weight="m">
            총 {selectedCartItemList.length}종류의 상품 {totalCartItemQuantity}개를 주문합니다.
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
      </ConfirmPurchasePageLoader>

      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        isDisabled
      >
        결제하기
      </Button>
    </>
  );
};

export default ConfirmPurchasePage;
