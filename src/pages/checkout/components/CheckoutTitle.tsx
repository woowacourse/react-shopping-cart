import TitleWithCaption from '../../../components/common/TitleWithCaption/TitleWithCaption';
import common from '../../../styles/common.module.css';

interface Props {
  totalCount: number;
  totalQuantity: number;
}

export default function CheckoutTitle({ totalCount, totalQuantity }: Props) {
  return (
    <TitleWithCaption title="주문 확인">
      <span className={common.captionText}>
        총 {totalCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </span>
      <span className={common.captionText}>최종 결제 금액을 확인해 주세요.</span>
    </TitleWithCaption>
  );
}
