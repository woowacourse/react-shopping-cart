import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import getItems from '../../api/get/getItems';
import * as S from './styled';
import useFetch from '../../hooks/useFetch';
import { useSetRecoilState } from 'recoil';
import { selectedCartItems } from '../../recoil/atoms';
import { useEffect } from 'react';

const ShoppingCartOverview = () => {
  const { data, isLoading, errorMessage } = useFetch(getItems);

  const setSelected = useSetRecoilState(selectedCartItems);

  useEffect(() => {
    if (data) {
      const selected = data.map(item => ({
        cartItemId: item.id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      setSelected(selected);
    }
  }, [data]);

  return (
    <S.Container>
      <ShoppingCartDescription kindCount={data?.length ?? 0} />
      <ShoppingCartList cartItems={data ?? []} />
      <PaymentTotal />
    </S.Container>
  );
};

export default ShoppingCartOverview;
