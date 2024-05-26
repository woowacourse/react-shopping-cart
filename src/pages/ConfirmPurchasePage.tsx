import { useNavigate } from 'react-router-dom';

import useOrder from '../hooks/order/useOrders';
import Header from '../components/Header/Header';
import useApiErrorState from '../hooks/error/useApiErrorState';
import { Button } from '../components/common/Button/Button.style';
import ConfirmPurchaseSection from '../components/ConfirmPurchaseSection/ConfirmPurchaseSection';

const ConfirmPurchasePage = () => {
  const navigate = useNavigate();
  const { orderSelectedCartItems } = useOrder();
  const { apiError } = useApiErrorState();

  if (apiError) {
    throw apiError;
  }

  return (
    <>
      <Header type="back" />
      <ConfirmPurchaseSection />
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', maxWidth: '768px', bottom: '0' }}
        onClick={async () => {
          await orderSelectedCartItems();
          navigate('/complete-purchse');
        }}
      >
        결제하기
      </Button>
    </>
  );
};
export default ConfirmPurchasePage;
