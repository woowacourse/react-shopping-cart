import Header from '../../components/Header/Header';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';

export default function CartPage() {
  const navigate = useNavigate();
  const handleHomeButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <>
      <Header>
        <Button variant="header" onClick={handleHomeButtonClick}>
          SHOP
        </Button>
      </Header>
      <Button variant="footer">주문 하기</Button>
    </>
  );
}
