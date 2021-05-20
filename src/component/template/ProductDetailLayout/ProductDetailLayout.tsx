import { ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import {
  Container,
  Image,
  Title,
  Price,
  ShoppingCartButton,
} from './ProductDetailLayout.styles';

interface ProductDetailLayoutProps {
  product: ProductType;
  onClickShoppingCartButton: (productId: string) => void;
}

const ProductDetailLayout = ({
  product,
  onClickShoppingCartButton,
}: ProductDetailLayoutProps) => (
  <Container>
    <Image src={product.image_url} />
    <Title>{product.name}</Title>
    <Price>
      <div>금액</div>
      <div>{numberWithCommas(product.price)}원</div>
    </Price>
    <ShoppingCartButton
      onClick={() => onClickShoppingCartButton(product.product_id)}
    >
      장바구니
    </ShoppingCartButton>
  </Container>
);

export default ProductDetailLayout;
