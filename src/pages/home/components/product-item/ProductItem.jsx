import { useDispatch, useSelector } from "react-redux";
import Cart from "@assets/images/cart.svg";
import ImageButton from "@home/components/image-button/ImageButton";
import createAction from "@redux/createAction";
import ACTION_TYPE from "@redux/actions";
import styles from "@home/components/product-item/product-item.module";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";

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
    <div className={cn(styles.productItem, className)}>
      <LoadingThumbnail
        src={`${thumbnailUrl}`}
        className={styles.thumbnail}
        alt={alt}
        minHeight="295"
      />
      <div className={cn(styles.content)}>
        <div className={cn(styles.productDetail)}>
          <div className={cn(styles.lLeft)}>
            <div className={cn(styles.productTitle)}>{title}</div>
            <div className={cn(styles.productPrice)}>{price}</div>
          </div>
          <div className="lRight">
            {quantity > 0 && (
              <ImageButton
                onClick={handleClick}
                included={existInCart(cart, id)}
                className={cn("addToCartBtn", styles.addToCartBtn)}
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
