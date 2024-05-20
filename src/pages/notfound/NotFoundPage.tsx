import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/constants/routes';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(PAGE_ROUTES.CART);
  };

  return (
    <div>
      NotFoundPage!
      <Button onClick={handleButtonClick}>되돌아가기</Button>
    </div>
  );
}
