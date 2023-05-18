import { StyledCartList } from '@components/pages/CartListSection/CartList/CartList.styled';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem, { CartItemInterface } from './CartItem/CartItem';

const CartList = () => {
  return (
    <FetchedDataList<CartItemInterface[]>
      endpoint={'/cart-items'}
      initialValue={[]}
    >
      {({ data, isError }) => {
        return (
          <>
            <ErrorModal isError={isError} />
            <StyledCartList>
              {data.map((item: CartItemInterface) => (
                <CartItem key={item.id} cartItem={{ ...item }} />
              ))}
            </StyledCartList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default CartList;
