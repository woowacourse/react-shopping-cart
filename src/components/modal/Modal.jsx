import styles from "@shared/modal/modal.module";

const cn = require("classnames");

function Modal({ isVisible = false, children }) {
  const classNames = cn(styles.modal, { [styles.hide]: !isVisible });

  return (
    <div className={classNames}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.dialog}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
