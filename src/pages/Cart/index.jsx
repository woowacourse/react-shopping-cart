import { useSelector } from 'react-redux';
import Styled from './style';

const Cart = () => {
  const { data } = useSelector((state) => state.cart);

  return (
    <Styled.Wrapper>
      {data.map(({ name, quantity, price, id }) => (
        <div key={id}>
          상품명 : {name} /
          <span>
            {quantity}개 {price}원
          </span>
        </div>
      ))}
    </Styled.Wrapper>
  );
};

export default Cart;
