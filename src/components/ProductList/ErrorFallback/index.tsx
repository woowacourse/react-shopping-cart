import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import ErrorFallbackPopup from '../../ErrorFallback/ErrorFallbackPopup';

interface Props extends FallbackProps {}

const ProductListErrorFallback: VFC<Props> = ({ resetErrorBoundary }) => {
  return (
    <ErrorFallbackPopup
      onReset={resetErrorBoundary}
      header="상품 목록 조회 실패"
      description="상품 목록을 불러오는데 실패했습니다."
      buttonText="다시 불러오기"
    />
  );
};

export default ProductListErrorFallback;
