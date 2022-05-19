import styled from 'styled-components';
import CartItem from './CartItem';

function CartListContainer({ isStoredProductsLoading, storedProducts }) {
  return (
    <Style.Container>
      {isStoredProductsLoading && <h1>로딩중...</h1>}
      {!isStoredProductsLoading &&
        storedProducts?.map(({ id, price, title, src }) => (
          <CartItem key={id} price={price} title={title} src={src} />
        ))}
    </Style.Container>
  );
}

export default CartListContainer;

const Style = {
  Container: styled.section``,
};
