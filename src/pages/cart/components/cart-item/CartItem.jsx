import Checkbox from "@shared/checkbox/single/Checkbox";
import LoadingThumbnail from "@shared/loading-thumbnail/LoadingThumbnail";
import NumberInput from "@shared/number-input/NumberInput";
import DeleteIcon from "@shared/icons/delete-icon/DeleteIcon";
import styles from "./cart-item.module";

function CartItem({
  checked,
  src,
  alt,
  productId,
  productName,
  quantity,
  price,
  onChecked,
  onQuantityChange,
}) {
  return (
    <div className={styles.cartItem}>
      <Checkbox
        checked={checked}
        onChange={onChecked}
        className={styles.checkbox}
        id={productId}
      />
      <div className={styles.content}>
        <div className={styles.left}>
          <LoadingThumbnail src={src} alt={alt} />
        </div>
        <div className={styles.middle}>
          <div className={styles.productName}>{productName}</div>
        </div>
        <div className={styles.right}>
          <DeleteIcon onClick={() => alert("onClicked!")} />
          <NumberInput onChange={onQuantityChange} value={quantity} />
          <div className={styles.productPrice}>{price}</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
