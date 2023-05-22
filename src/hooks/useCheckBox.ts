import { useRecoilState } from "recoil";
import { cartIsCheckedAtom } from "../store/cartProductsAtoms";

const useCheckBoxesToggler = () => {
  const [isChecked, setIsChecked] = useRecoilState(cartIsCheckedAtom);

  const getIsChecked = (id: number) => {
    return !!isChecked[id];
  };

  const toggleChecked = (id: number) => {
    setIsChecked((prevIsChecked) => {
      const newChecked = !prevIsChecked[id];

      return { ...prevIsChecked, [id]: newChecked };
    });
  };

  const setAllCheckBoxes = (state: boolean) => {
    setIsChecked((prevIsChecked) => {
      console.log(
        Object.fromEntries(
          Object.keys(prevIsChecked).map((key) => [key, state])
        )
      );

      return Object.fromEntries(
        Object.keys(prevIsChecked).map((key) => [key, state])
      );
    });
  };

  return { getIsChecked, toggleChecked, setAllCheckBoxes };
};

export { useCheckBoxesToggler };
