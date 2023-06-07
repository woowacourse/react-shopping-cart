/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import CartItem from '../../box/CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text';
import useModal from '../../../hooks/useModal';
import useCart from '../../../hooks/useCart';
import { useRecoilState } from 'recoil';
import { checkCartListState, deleteModalState } from '../../../service/atom';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { CartItemType } from '../../../types/types';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import EmptyList from '../../common/EmptyList/EmptyList';

const CartList = () => {
  const { cartData, deleteCartItemAPI, isLoading } = useCart();
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);

  const { openModal } = useModal(deleteModalState);

  const deleteSelectCart = async () => {
    checkCartList.forEach((cartId) => {
      deleteCartItemAPI(cartId);
    });
    setCheckCartList([]);
  };

  const toggleAllCheckBox = () => {
    if (cartData && cartData.length === checkCartList.length) {
      setCheckCartList([]);
      return;
    }
    cartData && setCheckCartList(cartData.map((cart) => cart.id));
  };

  return (
    <CartListWrapper>
      <CartListHead>
        <Text size="small" weight="light">
          든든배송 상품 ({cartData?.length}개)
        </Text>
        <CartListChecker>
          <CheckBox
            label={`전체선택(${checkCartList.length}개)`}
            checked={cartData ? cartData.length === checkCartList.length : false}
            onClick={toggleAllCheckBox}
          />
          <Button
            size="small"
            text="선택삭제"
            onClick={() => openModal({ callback: deleteSelectCart })}
          />
        </CartListChecker>
      </CartListHead>
      <CartResponse cartData={cartData} isFetching={isLoading} />
    </CartListWrapper>
  );
};

const CartResponse = ({
  cartData,
  isFetching,
}: {
  cartData?: CartItemType[];
  isFetching: boolean;
}) => {
  if (isFetching) {
    return <LoadingSpinner />;
  }
  if (!cartData) {
    return <ErrorBox errorType="network" />;
  }
  if (cartData.length === 0) {
    return <EmptyList text="장바구니에 상품이 없습니다" />;
  }
  return (
    <Cart>
      {cartData.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </Cart>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartListHead = styled.div`
  width: 100%;
  border-bottom: 3px solid #aaa;
  padding: 80px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 70px;
  background-color: #fff;
  z-index: 30;
`;

const Cart = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CartListChecker = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
