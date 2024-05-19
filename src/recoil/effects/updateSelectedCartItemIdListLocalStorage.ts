import { AtomEffect, DefaultValue } from 'recoil';
import { requestCartItemList } from '../../apis/cartItemList/cartItemList';

export const updateSelectedCartItemIdListLocalStorage =
  (key: string): AtomEffect<number[]> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    } else {
      requestCartItemList()
        .then((cartItemList) => {
          const cartItemIdList = cartItemList.map(({ cartItemId }) => cartItemId);
          setSelf(cartItemIdList);
        })
        .catch((error) => {
          console.error(error);
          setSelf([]);
        });
    }

    onSet((selectedCartItemIdList: number[], _: number[] | DefaultValue, isReset: boolean) => {
      if (isReset) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(selectedCartItemIdList));
    });
  };
