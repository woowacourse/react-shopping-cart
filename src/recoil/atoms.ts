import { atom } from 'recoil';

const UNCHECKED_ITEM_IDS = 'uncheckedItemIds';

export const uncheckedItemIdsState = atom<number[]>({
  key: 'isCheckedItemIdsState',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(UNCHECKED_ITEM_IDS);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(UNCHECKED_ITEM_IDS)
          : localStorage.setItem(UNCHECKED_ITEM_IDS, JSON.stringify(newValue));
      });
    },
  ],
});
