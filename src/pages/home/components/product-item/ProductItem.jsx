import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/actions";

import StyledProductItem from "@/pages/home/components/product-item/ProductItem.styled";
import Thumbnail from "@/pages/home/components/thumbnail/Thumbnail";
import ImageButton from "@/pages/home/components/image-button/ImageButton";
import CartIcon from "@/assets/images/cart.svg";

function ProductItem({ id, name, price, imgUrl }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProductToCart({ id, name, price, imgUrl }));
  };

  return (
    <StyledProductItem>
      <Thumbnail src={`${imgUrl}`} name={name} />
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
    </StyledProductItem>
  );
}

export default ProductItem;
