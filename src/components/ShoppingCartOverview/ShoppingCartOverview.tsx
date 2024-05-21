import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import * as S from './styled';
import useFetch from '../../hooks/useFetch';
import FloatingButton from '../FloatingButton/FloatingButton';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ROUTER_URLS } from '../../constants/constants';
import CartItemEmptyFallback from '../CartItemEmptyFallback/CartItemEmptyFallback';
import { selectedCartItems } from '../../recoil/atoms';
import getCartItems from './../../api/get/getCartItems';
import { priceInfoStore } from '../../recoil/selectors';

const ShoppingCartOverview = () => {
  const { data, refetch } = useFetch(getCartItems);
  const navigate = useNavigate();
  const selectItems = useRecoilValue(selectedCartItems);
  const priceInfo = useRecoilValue(priceInfoStore);

  const goOrderInfo = () => {
    navigate(ROUTER_URLS.ORDER_INFO, {
      state: {
        orderItems: selectItems,
        kindCount: selectItems.length,
        productCount: selectItems.reduce((acc, cur) => acc + cur.quantity, 0),
        totalPrice: priceInfo.total,
      },
    });
  };

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <S.Container>
            <ShoppingCartDescription
              title="장바구니"
              descriptionShowingCondition={(data?.length ?? 0) > 0}
              description={`현재 ${data?.length ?? 0}종류의 상품이 담겨있습니다.`}
            />
            <ShoppingCartList cartItems={data ?? []} refetch={refetch} />
            <PaymentTotal />
          </S.Container>
          <FloatingButton
            label={'주문 확인'}
            onClick={goOrderInfo}
            disabled={selectItems.length <= 0}
          />
        </>
      ) : (
        <>
          <S.Container>
            <ShoppingCartDescription
              title="장바구니"
              descriptionShowingCondition={false}
              description=""
            />
            <CartItemEmptyFallback />
          </S.Container>
          <FloatingButton label={'주문 확인'} disabled />
        </>
      )}
    </>
  );
};

export default ShoppingCartOverview;
