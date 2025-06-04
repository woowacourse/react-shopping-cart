import * as styles from "./ErrorToast.style";
import { createPortal } from "react-dom";

export default function ErrorToast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return createPortal(
    <styles.Toast>
      <styles.Message>{message}</styles.Message>
      <styles.CloseButton onClick={onClose}>✕</styles.CloseButton>
    </styles.Toast>,
    document.body
  );
}
