import Button from '@/components/common/Button';
import Header from '@/components/header/Header';
import { PAGE_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/asset/back.png';
import { useCouponManager } from '@/store/custom/useCouponManager';

export default function CheckoutPageHeader() {
  const navigate = useNavigate();
  const { initializeCouponStates } = useCouponManager();

  const handleBackButtonClick = () => {
    initializeCouponStates();
    navigate(PAGE_ROUTES.CART);
  };

  return (
    <Header>
      <Button onClick={handleBackButtonClick}>
        <img src={BackIcon} width={32} height={32} alt="back-icon" />
      </Button>
    </Header>
  );
}
