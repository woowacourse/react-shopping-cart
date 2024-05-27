import { useRecoilValue } from 'recoil';
import CaptionText from '../../../components/common/CaptionText/CaptionText';
import TitleWithCaption from '../../../components/common/TitleWithCaption/TitleWithCaption';
import { totalProductQuantityState } from '../../../store/selectors';

export default function CheckoutTitle() {
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);
  return (
    <TitleWithCaption title="주문 확인">
      <CaptionText>
        총 {totalCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </CaptionText>
      <CaptionText>최종 결제 금액을 확인해 주세요.</CaptionText>
    </TitleWithCaption>
  );
}
