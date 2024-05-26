import { allSelectedState } from "@/store/selectors/selectedSelector/allSelectedSelector";
import { useRecoilState } from "recoil";

const useAllSelected = () => {
  const [isAllSelected, setIsAllSelected] = useRecoilState(allSelectedState);

  const handleAllSelect = () => {
    setIsAllSelected(!isAllSelected);
  };

  return { isAllSelected, handleAllSelect };
};

export default useAllSelected;
