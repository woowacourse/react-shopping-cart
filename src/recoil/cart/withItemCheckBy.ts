import { DefaultValue, selectorFamily, useRecoilState } from 'recoil';
import cartState from './cartState';

const withItemCheckBy = selectorFamily<boolean, number>({
  key: 'cartItemCheckedState',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartItem = cart.filter((cartItem) => cartItem.id === id)[0];

      return cartItem?.checked ?? false;
    },

  set:
    (id) =>
    ({ set }, checked) => {
      if (!(checked instanceof DefaultValue)) {
        set(cartState, (prevCartList) => {
          return prevCartList.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                checked,
              };
            } else {
              return item;
            }
          });
        });
      }
    },
});

export default withItemCheckBy;

export const useCartItemCheckedBy = (id: number) => {
  const [isChecked, setIsChecked] = useRecoilState(withItemCheckBy(id));
  return {
    isChecked,
    toggleCheck: () => {
      setIsChecked(!isChecked);
    },
  };
};
