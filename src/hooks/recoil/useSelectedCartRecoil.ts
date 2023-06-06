import { useRecoilState } from 'recoil';
import { selectedCartIdListState } from '../../recoil/atoms/cartAtom';

export const useSelectedCartRecoil = () => {
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const addNewSelectedCartId = (id: number) => {
    setSelectedCartIdList((current) => [...current, id]);
  };

  const deleteSelectedCartId = (id: number) => {
    setSelectedCartIdList((current) =>
      current.filter((selectedCartId) => selectedCartId !== id)
    );
  };

  const getIsSelectedCartIdListIncludes = (id: number) => {
    return selectedCartIdList.includes(id);
  };

  return {
    selectedCartIdList,
    addNewSelectedCartId,
    deleteSelectedCartId,
    getIsSelectedCartIdListIncludes,
  };
};
