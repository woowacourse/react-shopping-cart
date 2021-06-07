import RootTemplate from '../../components/shared/RootTemplate';
import {
  ProductDetailButton,
  ProductDetailCard,
  ProductDetailHeading,
  ProductDetailPrice,
} from './styles';

const ProductDetailPage = () => {
  return (
    <RootTemplate>
      <ProductDetailCard image="https://picsum.photos/200/200" type="vertical">
        <ProductDetailHeading>[든든] 동동 스위치콘</ProductDetailHeading>
        <ProductDetailPrice>
          <span>금액</span>
          <span>99,800원</span>
        </ProductDetailPrice>
        <ProductDetailButton>장바구니</ProductDetailButton>
      </ProductDetailCard>
    </RootTemplate>
  );
};

export default ProductDetailPage;
