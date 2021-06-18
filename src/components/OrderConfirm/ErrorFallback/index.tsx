import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router';
import ErrorFallbackPopup from '../../ErrorFallback/ErrorFallbackPopup';

interface Props extends FallbackProps {}

const OrderConfirmErrorFallback: VFC<Props> = ({ resetErrorBoundary }) => {
  const history = useHistory();

  const replaceToCart = () => {
    history.replace('/shoppingCart');
    resetErrorBoundary();
  };

  return (
    <ErrorFallbackPopup
      onReset={replaceToCart}
      header="주문 실패"
      description="주문에 실패했습니다."
      buttonText="장바구니로 돌아가기"
    />
  );
};

export default OrderConfirmErrorFallback;
