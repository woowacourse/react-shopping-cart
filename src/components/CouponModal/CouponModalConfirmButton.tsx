import { CouponModalConfirmButtonStyle } from './CouponModal.styles';

function CouponModalConfirmButton({
  onConfirm,
  children,
  isAvailable,
}: {
  onConfirm: () => void;
  children: React.ReactNode;
  isAvailable: boolean;
}) {
  return (
    <button
      css={CouponModalConfirmButtonStyle(isAvailable)}
      onClick={onConfirm}
    >
      {children}
    </button>
  );
}

export default CouponModalConfirmButton;
