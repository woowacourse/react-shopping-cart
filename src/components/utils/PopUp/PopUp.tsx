import styles from './style.module.css';

interface PopUpProps {
  text: string[];
  isSuccess: boolean;
}

const PopUp = ({ text, isSuccess }: PopUpProps) => {
  return (
    <div className={isSuccess ? styles.successPopupBox : styles.failurePopupBox}>
      {text.map((textItem, index) => (
        <div key={index}>{textItem}</div>
      ))}
    </div>
  );
};

export default PopUp;
