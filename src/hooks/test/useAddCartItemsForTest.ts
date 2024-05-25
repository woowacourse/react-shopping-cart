import { requestAddCartItemForTest } from '../../apis/cartItemList';
import useFetchCartItemList from '../cartItem/useFetchCartItemList';

const ID_LIST = [2, 3, 10, 11, 12, 21, 34];

const useAddCartItemsForTest = () => {
  const { fetchCartItemList } = useFetchCartItemList();
  const addCartItemsForTest = () => {
    ID_LIST.forEach(async (id) => {
      await requestAddCartItemForTest(id);
    });
    fetchCartItemList();
  };

  return { addCartItemsForTest };
};

export default useAddCartItemsForTest;
