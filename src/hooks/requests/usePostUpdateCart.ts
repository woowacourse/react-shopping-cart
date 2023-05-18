import useOptimisticUpdate from '../useOptimisticUpdate.ts';
import { Item } from '../../types/CartList.ts';
import { CartUpdateBody } from '../../types/requestBody.ts';
import { endPoints } from '../../constants/endPoints.ts';

const usePostUpdateCart = (initialCartItemProp: Item | undefined) => {
  const { data, optimisticUpdate } = useOptimisticUpdate<Item, CartUpdateBody>({ url: endPoints.cartUpdate, method: 'post', initialState: initialCartItemProp });

  return { data, optimisticUpdate };
};

export default usePostUpdateCart;
