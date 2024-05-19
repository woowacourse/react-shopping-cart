import { requestCartItemList } from '../../apis/cartItemList/cartItemList';

export const updateSelectedCartItemIdListLocalStorage =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
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

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
