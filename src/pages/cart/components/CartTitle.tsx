import Text from '../../../components/common/Text/Text';

interface Props {
  productsCount: number;
}

export default function CartTitle({ productsCount }: Props) {
  return (
    <Text.TitleWithCaption title="장바구니">
      <Text.Caption>현재 {productsCount}종류의 상품이 담겨있습니다.</Text.Caption>
    </Text.TitleWithCaption>
  );
}
