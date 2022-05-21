import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useCart from 'hooks/useCart';
import usePost from 'hooks/usePost';
import TitleHeader from 'components/TitleHeader';
import CartTable from 'components/CartTable';
import CartOrder from 'components/CartOrder';
import ImgWrapper from 'components/ImgWrapper';
import errorApiImg from 'assets/png/errorApiImg.png';
import spinner from 'assets/svg/spinner.svg';
import useOrderList from 'hooks/useOrderList';

const Cart = () => {
  const [checkedIdList, setCheckedIdList] = useState([]);
  const [checkedItemList, setCheckedItemList] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const { callApi: orderCheckedList } = usePost('/orderList', checkedItemList);
  const { cartList, isLoading, isError } = useCart();
  const { getOrderListEffect, orderList } = useOrderList();

  useEffect(() => {
    const initialIdList = cartList.map((item) => item.id);
    setCheckedIdList(initialIdList);
  }, [cartList]);

  useEffect(() => {
    const newCheckedItemList = cartList.filter(
      (item) =>
        checkedIdList.findIndex((checkedId) => item.id === checkedId) !== -1,
    );
    const totalPrice = newCheckedItemList.reduce((acc, cur) => {
      return acc + Number(cur.price * cur.cartQuantity);
    }, 0);
    setCheckedItemList(newCheckedItemList);
    setTotalPrice(totalPrice);
  }, [checkedIdList]);

  const handleClickOrder = async () => {
    console.log('1');
    await orderCheckedList();
    console.log('2');
    await getOrderListEffect();
    console.log('orderList', orderList);
  };

  return (
    <>
      <Styled.CartSection>
        <TitleHeader>장바구니</TitleHeader>
        <Styled.FlexBetweenBox>
          <CartTable
            cartList={cartList}
            checkedIdList={checkedIdList}
            setCheckedIdList={setCheckedIdList}
          />
          <CartOrder
            totalPrice={totalPrice}
            totalCount={checkedIdList.length}
            handleClickOrder={handleClickOrder}
          />
        </Styled.FlexBetweenBox>
      </Styled.CartSection>
      {isLoading && (
        <ImgWrapper src={spinner} isMini={true} alt="로딩 스피너" />
      )}
      {isError && <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />}
    </>
  );
};

const Styled = {
  CartSection: styled.section`
    padding: 24px 100px;
  `,
  FlexBetweenBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

export default Cart;
