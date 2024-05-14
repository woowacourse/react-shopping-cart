import {
  Img,
  ProductItemStyle,
  ProductItemTop,
  ProductItemBundle,
} from './ProductItem.style';
import CheckBox from '../CheckBox/CheckBox';
import { Button, CountButton } from '../Button';

export default function ProductItem() {
  return (
    <ProductItemStyle>
      <ProductItemTop>
        <CheckBox />
        <Button text="삭제" />
      </ProductItemTop>
      <ProductItemBundle>
        <Img
          src="https://t1.daumcdn.net/cfile/tistory/991583485DA1FF601D"
          alt=""
          className="product-item_img"
        />
        <div className="product-item_content">
          <span className="product-item_content_name">상품 이름</span>
          <span className="product-item_content_price">35,000원</span>
          <div className="product-item_content_amount-bundle">
            <CountButton type="minus" />
            <span className="product-item_content_amount">2</span>
            <CountButton type="plus" />
          </div>
        </div>
      </ProductItemBundle>
    </ProductItemStyle>
  );
}
