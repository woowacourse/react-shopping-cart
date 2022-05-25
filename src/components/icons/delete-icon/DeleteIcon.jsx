import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import styles from "./delete-icon.module";

function DeleteIcon({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={() => onClick && onClick()}
      className={cn(styles.deleteIcon, className)}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export default DeleteIcon;
