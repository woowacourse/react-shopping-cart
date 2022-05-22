import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import CartIcon from "@/assets/images/cart.svg";
import StyledProductItem from "@/pages/home/components/product-item/ProductItem.styled";
import Thumbnail from "@/pages/home/components/thumbnail/Thumbnail";
import ImageButton from "@/pages/home/components/image-button/ImageButton";
import createAction from "@/redux/createAction";

function ProductItem({ id, name, price, imgUrl }) {
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
            <div className="product-price">
              {price.toLocaleString("ko-KR")}원
            </div>
          </div>
          <div className="l-right">
            <ImageButton onClick={handleClick}>
              <CartIcon />
            </ImageButton>
          </div>
        </div>
      </div>
      <div className="overlay" />
    </StyledProductItem>
  );
}

export default ProductItem;
