import StarcraftLogo from "../../../../assets/images/gardiun.png";
import Cart from "../../../../assets/images/cart.png";
import S from "../../styled";
import Thumbnail from "../thumbnail/Thumbnail";
import ImageButton from "../image-button/ImageButton";

function ProductItem() {
  return (
    <S.ProductItem>
      <Thumbnail src={StarcraftLogo} />
      <div className="content">
        <div className="product-detail">
          <div className="l-left">
            <div className="product-title">히드라리스크</div>
            <div className="product-price">150 원</div>
          </div>
          <div className="l-right">
            <ImageButton src={Cart} />
          </div>
        </div>
      </div>
      <div className="overlay" />
    </S.ProductItem>
  );
}

export default ProductItem;
