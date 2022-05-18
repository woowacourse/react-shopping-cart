import Styled from './style';
import { cartList } from 'assets/mock';
import CartContainer from 'components/CartContainer/CartContainer';
import CartItem from 'components/CartItem/CartItem';
import Title from 'components/Title/Title';
import PaymentBox from 'components/PaymentBox/PaymentBox';

const Cart = () => {
  return (
    <Styled.Wrapper>
      <Title contents="장바구니" />
      <Styled.ContentsWrapper>
        <CartContainer>
          {cartList.map(({ id, name, imgUrl, price, quantity }) => (
            <CartItem
              key={id}
              name={name}
              imgUrl={imgUrl}
              price={price}
              quantity={quantity}
            />
          ))}
        </CartContainer>
        <Styled.PaymentBoxWrapper>
          <PaymentBox />
        </Styled.PaymentBoxWrapper>
      </Styled.ContentsWrapper>
    </Styled.Wrapper>
  );
};

export default Cart;
