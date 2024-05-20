import Header from '@/components/Header/Header';
import useCartNavigate from '@/hooks/useCartNavigate';
import Button from '../../../components/common/Button';

export default function CartPageHeader() {
  const { handleHomeButtonClick } = useCartNavigate();

  return (
    <Header>
      <Button variant="header" onClick={handleHomeButtonClick}>
        SHOP
      </Button>
    </Header>
  );
}
