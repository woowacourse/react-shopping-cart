import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router';
import ErrorFallbackPopup from '../../ErrorFallback/ErrorFallbackPopup';

interface Props extends FallbackProps {}

const ProductDetailErrorFallback: VFC<Props> = () => {
  const history = useHistory();

  return (
    <ErrorFallbackPopup
      onReset={() => history.goBack()}
      header="상품 정보 조회 실패"
      description="상품 정보를 조회하는데 실패했습니다."
      buttonText="뒤로 돌아가기"
    />
  );
};

export default ProductDetailErrorFallback;
