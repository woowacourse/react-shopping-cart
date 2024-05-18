import ENDPOINTS from '../../constants/endpoints';
import FooterButton from '../FooterButton/FooterButton';
import { hasCheckedItemsState } from '../../recoil/selectors';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function ConfirmButton({ ...props }) {
  const navigate = useNavigate();
  const hasCheckedItems = useRecoilValue(hasCheckedItemsState);

  const handleClickConfirmButton = () => {
    navigate(ENDPOINTS.confirmOrder, { state: { isSubmitted: true } });
  };
  return (
    <FooterButton
      {...props}
      buttonText="주문 확인"
      disabled={!hasCheckedItems}
      onClick={handleClickConfirmButton}
    />
  );
}
