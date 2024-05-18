import { ROUTER_URL } from '../../constants/constants';

import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import FloatingButton from '../FloatingButton/FloatingButton';
import Fallback from '../Fallback/Fallback';

import getItems from '../../api/get/getItems';
import useFetch from '../../hooks/useFetch';
import { orderInfoStore } from '../../recoil/selectors';
import { selectedCartItems } from '../../recoil/atoms';

import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

const ShoppingCartOverview = () => {
  const { data, refetch } = useFetch(getItems);
  const orderInfo = useRecoilValue(orderInfoStore);
  const navigate = useNavigate();
  const selectItemsLength = useRecoilValue(selectedCartItems).length;

  const goOrderInfo = () => {
    navigate(ROUTER_URL.ORDER_INFO, { state: orderInfo });
  };

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <S.Container>
            <ShoppingCartDescription kindCount={data?.length ?? 0} />
            <ShoppingCartList cartItems={data ?? []} refetch={refetch} />
            <PaymentTotal />
          </S.Container>
          <FloatingButton
            label={'주문 확인'}
            onClick={goOrderInfo}
            disabled={selectItemsLength <= 0}
          />
        </>
      ) : (
        <>
          <S.Container>
            <ShoppingCartDescription kindCount={0} />
            <Fallback />
          </S.Container>
          <FloatingButton label={'주문 확인'} disabled />
        </>
      )}
    </>
  );
};

export default ShoppingCartOverview;
