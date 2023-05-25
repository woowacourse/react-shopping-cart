import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { checkedCartItemsState } from '@recoil/atom';

export const useUpdateCheckedCartItems = (
  productId: number,
  isChecked: boolean
) => {
  const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);

  useEffect(() => {
    const updateCheckedCartItems = () => {
      setCheckedCartItems(prev => {
        const newCheckedCartItems = {
          ...prev,
        };

        delete newCheckedCartItems[`productId${productId}`];

        return !isChecked
          ? newCheckedCartItems
          : Object.assign(newCheckedCartItems, {
              [`productId${productId}`]: productId,
            });
      });
    };

    updateCheckedCartItems();
  }, [isChecked, productId, setCheckedCartItems]);
};
