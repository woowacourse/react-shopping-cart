import { useSelector } from 'react-redux';

const useOrderList = () => {
  const orderItemList = useSelector((state) => state.orderList.orderItemList);

  return {
    orderItemList,
  };
};

export default useOrderList;
