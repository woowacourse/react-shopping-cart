import { Dispatch } from 'react';

import { Product } from '@customTypes/Product';

import { StyledCartList } from '@components/pages/CartPage/CartListSection/CartList/CartList.styled';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from './CartItem/CartItem';

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CartListProps {
  handleDeleteButtonClick: (productId: number) => void;
  isDeleteItem: boolean;
  setIsDeleteItem: Dispatch<React.SetStateAction<boolean>>;
}

const CartList = (props: CartListProps) => {
  const { handleDeleteButtonClick, isDeleteItem, setIsDeleteItem } = props;

  return (
    <FetchedDataList<CartItem[]>
      endpoint={'/cart-items'}
      initialValue={[]}
      isDeleteItem={isDeleteItem}
    >
      {({ data, isError }) => {
        return (
          <>
            <ErrorModal isError={isError} />
            <StyledCartList>
              {data.map((item: CartItem) => {
                return (
                  <CartItem
                    key={item.id}
                    cartItemId={item.id}
                    quantity={item.quantity}
                    product={item.product}
                    handleDeleteButtonClick={handleDeleteButtonClick}
                    setIsDeleteItem={setIsDeleteItem}
                  />
                );
              })}
            </StyledCartList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default CartList;
