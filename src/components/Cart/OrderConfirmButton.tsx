import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import FooterButton from '../common/FooterButton';

import { isAllUnCheckedState } from '@recoil/cartItems/selectors';

export default function OrderConfirmButton() {
  const navigate = useNavigate();
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    navigate('/confirm');
  };

  return (
    <FooterButton id="주문확인" isDisabled={isAllUnChecked} onClick={handleClickOrderConfirm}>
      주문확인
    </FooterButton>
  );
}
