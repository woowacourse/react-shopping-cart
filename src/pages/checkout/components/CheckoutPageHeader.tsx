import Button from '@/components/common/Button';
import Header from '@/components/Header/Header';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/asset/back.png';

export default function CheckoutPageHeader() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <Header>
      <Button onClick={handleBackButtonClick}>
        <img src={BackIcon} width={32} height={32} alt="back-icon" />
      </Button>
    </Header>
  );
}
