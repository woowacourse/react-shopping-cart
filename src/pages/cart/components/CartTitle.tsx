import common from '../../../styles/common.module.css';
import TitleWithCaption from '../../../components/common/TitleWithCaption/TitleWithCaption';

interface Props {
  productsCount: number;
}

export default function CartTitle({ productsCount }: Props) {
  return (
    <TitleWithCaption title="장바구니">
      <span className={common.captionText}>현재 {productsCount}종류의 상품이 담겨있습니다.</span>
    </TitleWithCaption>
  );
}
