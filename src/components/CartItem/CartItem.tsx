import CheckBox from "../CheckBox/CheckBox";
import QuantityControlButton from "../QuantityControlButton/QuantityControlButton";
import {
  CountContainer,
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemController,
  ItemDetail,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./CartItem.styles";

function CartItem() {
  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemController}>
          <CheckBox id="adf" />
          <button css={DeleteButton}>삭제</button>
        </div>
        <div css={ItemInfo}>
          <img css={ProductImage} src={"/public/productImage.svg"}></img>
          <div css={ItemContent}>
            <div css={ItemDetail}>
              <h3 css={ItemTitle}>상품이름</h3>
              <p css={ItemPrice}>35,000원</p>
            </div>
            <div css={CountContainer}>
              <QuantityControlButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
