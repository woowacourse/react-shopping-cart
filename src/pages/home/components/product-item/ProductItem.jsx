import { useDispatch } from "react-redux";
import CartIcon from "@/assets/images/cart.svg";
import StyledProductItem from "@/pages/home/components/product-item/ProductItem.styled";
import Thumbnail from "@/pages/home/components/thumbnail/Thumbnail";
import ImageButton from "@/pages/home/components/image-button/ImageButton";
import createAction from "@/redux/createAction";

function ProductItem({ id, name, price, stock, imgUrl }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createAction("ADD_PRODUCT_TO_CART", id));
  };

  return (
    <StyledProductItem>
      <Thumbnail src={`${imgUrl}`} />
      <div className="content">
        <div className="product-detail">
          <div className="l-left">
            <div className="product-title">{name}</div>
            <div className="product-price">{price}원</div>
          </div>
          <div className="l-right">
            {stock > 0 && (
              <ImageButton onClick={handleClick}>
                <CartIcon width="36px" height="36px" fill="#03CF5B" />
              </ImageButton>
            )}
          </div>
        </div>
      </div>
      <div className="overlay" />
    </StyledProductItem>
  );
}

export default ProductItem;
