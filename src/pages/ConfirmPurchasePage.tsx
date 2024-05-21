import styled from 'styled-components';
import Header from '../components/Header/Header';
import Text from '../components/common/Text/Text';
import Button from '../components/common/Button/Button';
import useCartItemList from '../recoil/cartItemList/useCartItemList';
import { useCartItemSelectedIdList } from '../recoil/cartItem/useCartItemSelectedIdList';
import usePriceSelector from '../recoil/price/usePriceSelector';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 30px 20px 80px 20px;
  height: 80vh;
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
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useCartItemSelectedIdList();
  const { totalPrice } = usePriceSelector();

  const totalProducts = selectedIdList.length;

  const totalQuantity = cartItemList
    .filter(({ id }) => selectedIdList.includes(id))
    .reduce((sum, { quantity }) => {
      return sum + quantity;
    }, 0);

  console.log(cartItemList, selectedIdList, totalPrice);
  return (
    <>
      <Header type="back" />
      <CartPageContainer>
        <Text size="l" weight="l">
          주문 확인
        </Text>
        <Text size="s" weight="m">
          총 {totalProducts}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <PriceContainer>
          <Text size="m" weight="l">
            총 결제 금액
          </Text>
          <Text size="l" weight="l">
            {totalPrice.toLocaleString('ko-kr')}원
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
