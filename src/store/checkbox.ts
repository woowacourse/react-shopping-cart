import { atomFamily, selectorFamily } from 'recoil';

type CheckedItem = Readonly<{
  key: string;
  id: number;
}>;

const initialListState = atomFamily<number[], string>({
  key: 'initialList',
  default: [],
});

const checkedListState = atomFamily<Set<number>, string>({
  key: 'checkedList',
  default: new Set([]),
});

const checkedItemCountState = selectorFamily<number, string>({
  key: 'checkedItemCount',
  get:
    (key) =>
    ({ get }) =>
      get(checkedListState(key)).size,
});

const isAllCheckedState = selectorFamily<boolean, string>({
  key: 'isAllChecked',
  get:
    (key) =>
    ({ get }) => {
      const initialList = get(initialListState(key));
      const checkedList = get(checkedListState(key));

      const isAllChecked = initialList.length !== 0 && initialList.length === checkedList.size;

      return isAllChecked;
    },

  set:
    (key) =>
    ({ get, set }, isAllChecked) => {
      const initialList = get(initialListState(key));

      set(checkedListState(key), () => {
        return isAllChecked ? new Set([...initialList]) : new Set([]);
      });
    },
});

const checkedItemState = selectorFamily<boolean, CheckedItem>({
  key: 'checkedItem',
  get:
    ({ key, id }) =>
    ({ get }) => {
      const checkedList = get(checkedListState(key));

      return checkedList.has(id);
    },
  set:
    ({ key, id }) =>
    ({ set }, isChecked) => {
      set(checkedListState(key), (prevCheckedList) => {
        const newCheckedList = new Set(Array.from(prevCheckedList));

        isChecked ? newCheckedList.add(id) : newCheckedList.delete(id);

        return newCheckedList;
      });
    },
});

export {
  initialListState,
  checkedListState,
  isAllCheckedState,
  checkedItemCountState,
  checkedItemState,
};
