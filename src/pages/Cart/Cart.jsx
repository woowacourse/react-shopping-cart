import styled from 'styled-components';
import ImgWrapper from 'components/ImgWrapper';
import useAddCart from 'hooks/useAddCart';
import errorApiImg from 'assets/png/errorApiImg.png';
import Skeleton from 'components/Skeleton';

const Cart = () => {
  const { cart, isLoading, isError } = useAddCart();

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />}
      {!isLoading &&
        cart &&
        cart.map(({ name, cartQuantity, price, id }) => (
          <div key={id}>
            상품명 : {name} /
            <span>
              {cartQuantity}개 {price}원
            </span>
          </div>
        ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px;
  `,
};

export default Cart;
