import { useRecoilValue } from "recoil";

import { selectedCartItemSelector } from "@/recoil/selectedCardItems";

import SelectedCartItem from "./SelectedCartItem";

const SelectedCartItemList = () => {
  const selectedCartItems = useRecoilValue(selectedCartItemSelector);

  return (
    <>
      {selectedCartItems.map((item) => (
        <SelectedCartItem item={item} />
      ))}
    </>
  );
};

export default SelectedCartItemList;
