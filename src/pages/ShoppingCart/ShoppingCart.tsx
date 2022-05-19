import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import { useThunkFetch } from '@/hooks/useFecth';
import { fetchGetCartAsync } from '@/store/cart/action';

function ShoppingCart() {
  const data = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  return (
    <PageTemplate>
      <ErrorContainer>🚧 아직 준비 중인 서비스입니다. 🚧 </ErrorContainer>
    </PageTemplate>
  );
}

export default ShoppingCart;
