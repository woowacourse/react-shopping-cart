import { useEffect, useState } from 'react';

import { StyledCartList } from '@components/pages/CartPage/CartListSection/CartList/CartList.styled';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from './CartItem/CartItem';
import { Product } from '@customTypes/Product';

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

const CartList = () => {
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  useEffect(() => {
    if (isDeleteItem) setIsDeleteItem(false);
  }, [isDeleteItem]);

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
