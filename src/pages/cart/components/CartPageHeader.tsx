import Header from '@/components/header/Header';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/constants/routes';

export default function CartPageHeader() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate(PAGE_ROUTES.CART);
  };

  return (
    <Header>
      <Button variant="header" onClick={handleHomeButtonClick} aria-label="홈 버튼" type="button">
        SHOP
      </Button>
    </Header>
  );
}
