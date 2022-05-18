import styled from 'styled-components';
import ImgWrapper from 'components/ImgWrapper';
import useCart from 'hooks/useCart';
import errorApiImg from 'assets/png/errorApiImg.png';
import Skeleton from 'components/Skeleton';
import TitleHeader from 'components/TitleHeader';
import CartTable from 'components/CartTable';
import CartOrder from 'components/CartOrder';

const Cart = () => {
  const { getCartEffect, cart, isLoading, isError } = useCart();
  getCartEffect();

  const totalPrice = cart.reduce((acc, cur) => {
    return acc + Number(cur.price);
  }, 0);

  return (
    <Styled.CartSection>
      <TitleHeader>장바구니</TitleHeader>
      <Styled.FlexBetweenBox>
        {isLoading && <Skeleton sizeType="large" />}
        {isError && <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />}
        {!isLoading && cart && <CartTable cartList={cart} />}

        <CartOrder totalPrice={totalPrice} totalCount={cart.length} />
      </Styled.FlexBetweenBox>
    </Styled.CartSection>
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
