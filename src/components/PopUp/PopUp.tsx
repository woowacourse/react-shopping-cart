import styles from './style.module.css';

interface PopUpProps {
  text: string[];
  isSuccess: boolean;
}

const PopUp = ({ text, isSuccess }: PopUpProps) => {
  return (
    <div className={isSuccess ? styles.successPopupBox : styles.failurePopupBox}>
      {text.map((textItem) => (
        <div>{textItem}</div>
      ))}
    </div>
  );
};

export default PopUp;
