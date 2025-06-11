import { Close } from '../../assets';
import { CouponModalCloseButtonStyle } from './CouponModal.styles';

function CouponModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button css={CouponModalCloseButtonStyle} onClick={onClose}>
      <img src={Close} alt="close-button" />
    </button>
  );
}

export default CouponModalCloseButton;
