import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isCheckedItemIdsState } from '../recoil/atoms';

const IS_CHECKED_ITEM = 'isCheckedItem';

export const useCheckedItemIds = () => {
  const [checkedItemIds, setRecoilCheckedItemIds] = useRecoilState(isCheckedItemIdsState);

  useEffect(() => {
    const localStorageItemIds = localStorage.getItem(IS_CHECKED_ITEM);
    const parsedCheckedItemIds: Record<number, boolean> = localStorageItemIds
      ? JSON.parse(localStorageItemIds)
      : {};
    setRecoilCheckedItemIds(parsedCheckedItemIds);
  }, [setRecoilCheckedItemIds]);

  const getIsChecked = (id: number) => {
    return checkedItemIds[id] ?? true;
  };

  const checkId = (...ids: number[]) => {
    const nextCheckedItemIds = { ...checkedItemIds };
    ids.forEach((id) => (nextCheckedItemIds[id] = true));
    setRecoilCheckedItemIds(nextCheckedItemIds);
    localStorage.setItem(IS_CHECKED_ITEM, JSON.stringify(nextCheckedItemIds));
  };

  const uncheckId = (...ids: number[]) => {
    const nextCheckedItemIds = { ...checkedItemIds };
    ids.forEach((id) => (nextCheckedItemIds[id] = false));
    setRecoilCheckedItemIds(nextCheckedItemIds);
    localStorage.setItem(IS_CHECKED_ITEM, JSON.stringify(nextCheckedItemIds));
  };

  const deleteId = (id: number) => {
    const nextCheckedItemIds = { ...checkedItemIds };
    delete nextCheckedItemIds[id];
    setRecoilCheckedItemIds(nextCheckedItemIds);
    localStorage.setItem(IS_CHECKED_ITEM, JSON.stringify(nextCheckedItemIds));
  };

  return { getIsChecked, checkId, uncheckId, deleteId };
};
