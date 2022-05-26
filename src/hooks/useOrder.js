import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store from 'store/store';
import { doDeleteProductFromOrder, doAddProdcutToOrder } from 'actions/actionCreator';

const useOrder = id => {
  const { order } = useSelector(state => state.reducer);
  const [isInOrder, setIsInOrder] = useState(order.some(productId => productId === id));

  useEffect(() => {
    setIsInOrder(order.some(productId => productId === id));
  }, [order, id]);

  const updateOrder = () => {
    if (isInOrder) {
      store.dispatch(doDeleteProductFromOrder({ id }));
    } else {
      store.dispatch(doAddProdcutToOrder({ id }));
    }
  };

  return [isInOrder, updateOrder];
};

export default useOrder;
