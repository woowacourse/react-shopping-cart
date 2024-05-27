import { useRecoilValue } from 'recoil';
import { cartItemQuantityState } from '../../recoil/atoms';
import * as P from './ProductItem.style';

export default function OrderProductItem({ orderItem }: { orderItem: Cart }) {
  const quantity = useRecoilValue(cartItemQuantityState);
  return (
    <P.ProductItemStyle>
      <P.ProductItemBundle>
        <P.Img
          src={orderItem.product.imageUrl}
          alt={`${orderItem.product.name}의 상품 사진`}
          className="product-item_img"
        />
        <div className="product-item_content">
          <span className="product-item_content_name">
            {orderItem.product.name}
          </span>
          <span className="product-item_content_price">
            {orderItem.product.price.toLocaleString('ko-kr')}원
          </span>
          <div className="product-item_content_amount-bundle">
            <span className="product-item_content_amount">
              {quantity[orderItem.id]}개
            </span>
          </div>
        </div>
      </P.ProductItemBundle>
    </P.ProductItemStyle>
  );
}
