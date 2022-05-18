import { useDispatch, useSelector } from "react-redux";
import Cart from "../../../../assets/images/cart.svg";
import Thumbnail from "../thumbnail/Thumbnail";
import ImageButton from "../image-button/ImageButton";
import createAction from "../../../../redux/createAction";
import ACTION_TYPE from "../../../../redux/actions";
import styles from "./product-item.module.scss";

const cn = require("classnames");

function ProductItem({
  id,
  title,
  price,
  quantity,
  thumbnail_image: { url: thumbnailUrl, alt },
  className,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const existInCart = (cart, id) => {
    const isInclude = Object.keys(cart).includes(`${id}`);
    return isInclude;
  };

  const handleClick = () => {
    dispatch(createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART, id));
  };

  return (
    <div className={cn("product-item", styles["product-item"], className)}>
      <Thumbnail
        src={`${thumbnailUrl}`}
        className={styles.thumbnail}
        alt={alt}
      />
      <div className={cn("content", styles.content)}>
        <div className={cn("product-detail", styles["product-detail"])}>
          <div className={cn("l-left", styles["l-left"])}>
            <div className={cn("product-title", styles["product-title"])}>
              {title}
            </div>
            <div className={cn("product-price", styles["product-price"])}>
              {price}
            </div>
          </div>
          <div className="l-right">
            {quantity > 0 && (
              <ImageButton
                onClick={handleClick}
                included={existInCart(cart, id)}
                className={cn("add-to-cart-btn", styles["add-to-cart-btn"])}
              >
                <Cart width="36px" height="36px" fill="#00cc00" />
              </ImageButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
