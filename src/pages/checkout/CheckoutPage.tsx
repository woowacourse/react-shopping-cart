import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import BackIcon from '../../asset/back.png';

export default function CheckoutPage() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <>
      <Header>
        <Button variant="image" onClick={handleBackButtonClick}>
          <img src={BackIcon} width={32} height={32} alt="back-icon" />
        </Button>
      </Header>

      <Button variant="footer"> 결제하기</Button>
    </>
  );
}
