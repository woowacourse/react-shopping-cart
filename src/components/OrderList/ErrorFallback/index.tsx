import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import ErrorFallbackPopup from '../../ErrorFallback/ErrorFallbackPopup';

interface Props extends FallbackProps {}

const OrderListErrorFallback: VFC<Props> = ({ resetErrorBoundary }) => {
  return (
    <ErrorFallbackPopup
      onReset={resetErrorBoundary}
      header="주문 목록 조회 실패"
      description="주문 목록을 조회하는데 실패했습니다."
      buttonText="다시 조회하기"
    />
  );
};

export default OrderListErrorFallback;
