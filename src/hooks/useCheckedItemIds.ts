import parseJsonSafely from '../utils/parseJsonSafely';
import { uncheckedItemIdsState } from '../recoil/atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const UNCHECKED_ITEM_IDS = 'uncheckedItemIds';

const useCheckedItemIds = () => {
  const [uncheckedItemIds, setRecoilCheckedItemIds] = useRecoilState(uncheckedItemIdsState);

  useEffect(() => {
    const localStorageItemIds = localStorage.getItem(UNCHECKED_ITEM_IDS);
    const parsedCheckedItemIds: number[] = localStorageItemIds
      ? parseJsonSafely(localStorageItemIds) ?? {}
      : [];
    setRecoilCheckedItemIds(parsedCheckedItemIds);
  }, [setRecoilCheckedItemIds]);

  const getIsChecked = (id: number) => {
    return !uncheckedItemIds.includes(id);
  };

  const checkId = (...ids: number[]) => {
    const nextCheckedItemIds = ids.reduce(
      (arr, cur) => {
        const indexInUncheckedIds = arr.indexOf(cur);
        if (indexInUncheckedIds === -1) return arr;
        arr.splice(indexInUncheckedIds, 1);
        return arr;
      },
      [...uncheckedItemIds],
    );

    setRecoilCheckedItemIds(nextCheckedItemIds);
    localStorage.setItem(UNCHECKED_ITEM_IDS, JSON.stringify(nextCheckedItemIds));
  };

  const uncheckId = (...ids: number[]) => {
    const nextUncheckedIds = ids.reduce(
      (arr, cur) => {
        if (uncheckedItemIds.includes(cur)) return arr;
        arr.push(cur);
        return arr;
      },
      [...uncheckedItemIds],
    );
    setRecoilCheckedItemIds(nextUncheckedIds);
    localStorage.setItem(UNCHECKED_ITEM_IDS, JSON.stringify(nextUncheckedIds));
  };

  const deleteId = (id: number) => {
    checkId(id);
  };

  return { getIsChecked, checkId, uncheckId, deleteId };
};

export default useCheckedItemIds;
