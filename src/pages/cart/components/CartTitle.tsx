import TitleWithCaption from '../../../components/common/TitleWithCaption/TitleWithCaption';
import CaptionText from '../../../components/common/CaptionText/CaptionText';

interface Props {
  productsCount: number;
}

export default function CartTitle({ productsCount }: Props) {
  return (
    <TitleWithCaption title="장바구니">
      <CaptionText>현재 {productsCount}종류의 상품이 담겨있습니다.</CaptionText>
    </TitleWithCaption>
  );
}
