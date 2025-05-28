import EmptyCartContainer from './EmptyCartContainer/EmptyCartContainer';
import CardContainer from './CartContainer/CartContainer';
import { getCartItems } from '@/apis/cartItems/getCartItems';
import useFetchData from '@/shared/hooks/useFetchData';

export default function CartContent() {
  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch: refetchCartItems,
  } = useFetchData({ fetchFn: getCartItems });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (errorMessage) {
    return <div>에러남</div>;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  return <CardContainer cartItems={cartItems} refetchCartItems={refetchCartItems} />;
}
