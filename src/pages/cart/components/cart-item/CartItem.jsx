import Checkbox from "@shared/checkbox/single/Checkbox";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";
import NumberInput from "@shared/number-input/NumberInput";
import DeleteIcon from "@shared/icons/delete-icon/DeleteIcon";
import styles from "./cart-item.module";

const cn = require("classnames");

function CartItem({
  id: productId,
  title,
  thumbnail_image: { url, alt },
  quantity,
  price,
  checked,
  onDelete,
  onChecked,
  onQuantityChange,
  className,
}) {
  return (
    <div className={cn(styles.cartItem, className)}>
      <Checkbox
        checked={checked}
        onChange={onChecked}
        className={styles.checkbox}
        id={productId}
      />
      <div className={styles.content}>
        <div className={styles.left}>
          <LoadingThumbnail src={url} alt={alt} />
        </div>
        <div className={styles.middle}>
          <div className={styles.productName}>{title}</div>
        </div>
        <div className={styles.right}>
          <DeleteIcon onClick={onDelete} />
          <NumberInput onChange={onQuantityChange} value={quantity} />
          <div className={styles.productPrice}>{price}</div>
        </div>
      </div>
    </div>
  );
}

CartItem.defaultProps = {
  onDelete: () => undefined,
  onQuantityChange: () => undefined,
  onChecked: () => undefined,
};

export default CartItem;
