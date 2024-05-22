import { PurchaseProcessLayout } from '@components/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { useNavigate } from 'react-router-dom';

const OrderConfirmPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBottomButton = () => {
    navigate(ROUTE_PATHS.purchaseConfirm);
  };

  return (
    <PurchaseProcessLayout
      pageTitle="주문 확인"
      handleBottomBtnClick={handleClickBottomButton}
      bottomButtonText="결제하기"
    >
      <>{/*주문 확인*/}</>
    </PurchaseProcessLayout>
  );
};

export default OrderConfirmPage;
