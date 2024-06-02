import { useRecoilValue } from 'recoil';
import { totalProductQuantityState } from '@store/orderStore';
import Text from '@components/common/Text/Text';

export default function CheckoutTitle() {
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);
  return (
    <Text.TitleWithCaption title="주문 확인">
      <Text.Caption>
        총 {totalCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </Text.Caption>
      <Text.Caption>최종 결제 금액을 확인해 주세요.</Text.Caption>
    </Text.TitleWithCaption>
  );
}
