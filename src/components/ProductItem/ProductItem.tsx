import {
  Img,
  ProductItemStyle,
  ProductItemTop,
  ProductItemBundle,
} from './ProductItem.style';
import CheckBox from '../CheckBox/CheckBox';
import { Button, CountButton } from '../Button';

export default function ProductItem({ cartItem }: { cartItem: Cart }) {
  return (
    <ProductItemStyle>
      <ProductItemTop>
        <CheckBox />
        <Button text="삭제" />
      </ProductItemTop>
      <ProductItemBundle>
        <Img
          src={cartItem.product.imageUrl}
          alt={`${cartItem.product.name}의 상품 사진`}
          className="product-item_img"
        />
        <div className="product-item_content">
          <span className="product-item_content_name">
            {cartItem.product.name}
          </span>
          <span className="product-item_content_price">
            {cartItem.product.price}원
          </span>
          <div className="product-item_content_amount-bundle">
            <CountButton type="minus" />
            <span className="product-item_content_amount">
              {cartItem.quantity}
            </span>
            <CountButton type="plus" />
          </div>
        </div>
      </ProductItemBundle>
    </ProductItemStyle>
  );
}
