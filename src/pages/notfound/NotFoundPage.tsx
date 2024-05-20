import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <div>
      NotFoundPage!
      <Button variant="image" onClick={handleButtonClick}>
        되돌아가기
      </Button>
    </div>
  );
}
