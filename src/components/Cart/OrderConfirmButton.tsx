import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import FooterButton from '../common/FooterButton';

import { isAllUnCheckedState } from '@globalState/cartItems/selectors';

export default function OrderConfirmButton() {
  const navigate = useNavigate();
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    navigate('/confirm');
  };

  return (
    <FooterButton isDisabled={isAllUnChecked} onClick={handleClickOrderConfirm}>
      주문확인
    </FooterButton>
  );
}
