import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import getItems from '../../api/get/getItems';
import * as S from './styled';
import useFetch from '../../hooks/useFetch';

const ShoppingCartOverview = () => {
  const { data, refetch } = useFetch(getItems);

  return (
    <S.Container>
      <ShoppingCartDescription kindCount={data?.length ?? 0} />
      <ShoppingCartList cartItems={data ?? []} refetch={refetch} />
      <PaymentTotal />
    </S.Container>
  );
};

export default ShoppingCartOverview;
