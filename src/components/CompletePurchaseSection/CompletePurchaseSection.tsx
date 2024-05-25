import useSelectedCartItemList from '../../hooks/cartItem/useSelectedCartItemList';
import * as S from './CompletePurchaseSection.style';
import Text from '../common/Text/Text';
import usePrice from '../../hooks/price/usePrice';
import useDiscount from '../../hooks/price/useDiscount';

const CompletePurchaseSection = () => {
  const { selectedCartItemList, totalQuantity } = useSelectedCartItemList();
  const { totalPrice } = usePrice();
  const { totalDiscountAmount } = useDiscount();
  return (
    <S.CompletePurchaseSection>
      <Text size="l" weight="l">
        주문 확인
      </Text>
      <Text size="s" weight="m">
        총 {selectedCartItemList.length}종류의 상품 {totalQuantity}개를
        주문합니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </Text>
      <S.PriceContainer>
        <Text size="m" weight="l">
          총 결제 금액
        </Text>
        <Text size="l" weight="l">
          {(totalPrice - totalDiscountAmount).toLocaleString('ko-kr')}원
        </Text>
      </S.PriceContainer>
    </S.CompletePurchaseSection>
  );
};

export default CompletePurchaseSection;
