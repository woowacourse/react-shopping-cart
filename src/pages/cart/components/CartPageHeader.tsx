import Header from '@/components/header/Header';
import useCartNavigate from '@/hooks/useCartNavigate';
import Button from '../../../components/common/Button';

export default function CartPageHeader() {
  const { handleHomeButtonClick } = useCartNavigate();

  return (
    <Header>
      <Button variant="header" onClick={handleHomeButtonClick} aria-label="홈 버튼" type="button">
        SHOP
      </Button>
    </Header>
  );
}
