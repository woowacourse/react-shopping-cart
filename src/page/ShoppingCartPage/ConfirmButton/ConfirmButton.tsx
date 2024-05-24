import ENDPOINTS from '../../../constants/endpoints';
import FooterButton from '../../../components/FooterButton/FooterButton';
import { checkedItemsState } from '../../../recoil/selectors';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function ConfirmButton({ ...props }) {
  const navigate = useNavigate();
  const hasCheckedItems = useRecoilValue(checkedItemsState).length > 0;

  const handleClickConfirmButton = () => {
    navigate(ENDPOINTS.orderConfirmation, { state: { lastPage: ENDPOINTS.shoppingCart } });
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
