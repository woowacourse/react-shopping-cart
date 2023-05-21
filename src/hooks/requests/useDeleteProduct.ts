import useFetch, { FetchState } from '../useFetch.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useDeleteProduct = (): [FetchState<null>, (itemId: number) => Promise<void>] => {
  const [deleteState, deleteItem] = useFetch<null>(endPoints.deleteCart, 'DELETE');

  const deleteProduct = async (itemId: number) => {
    await deleteItem({ param: itemId });
  };

  return [deleteState, deleteProduct];
};

export default useDeleteProduct;
