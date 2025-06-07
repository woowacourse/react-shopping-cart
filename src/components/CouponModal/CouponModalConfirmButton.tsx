import Text from '../@common/Text/Text';

import { CouponModalConfirmButtonStyle } from './CouponModal.styles';

function CouponModalConfirmButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <button css={CouponModalConfirmButtonStyle} onClick={onConfirm}>
      <Text varient="body">쿠폰 적용하기</Text>
    </button>
  );
}

export default CouponModalConfirmButton;
