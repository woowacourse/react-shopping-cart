import cn from "classnames";
import styles from "@home/components/image-button/image-button.module";

function ImageButton({ children, onClick, included, className }) {
  return (
    <button
      className={cn(styles.imageButton, className)}
      type="button"
      onClick={onClick}
      {...(included ? { disabled: true } : {})}
    >
      {children}
    </button>
  );
}

export default ImageButton;
