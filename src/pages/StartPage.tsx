import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import { ROUTES } from '../constants/routes';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <Button onClick={() => navigate(ROUTES.CART_ORDERS)}>장바구니 페이지로 이동</Button>
    </div>
  );
};

export default StartPage;
