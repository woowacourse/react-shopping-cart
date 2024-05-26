import { useRecoilState, useResetRecoilState } from "recoil";
import { shippingAreaState } from "@/stores/cartPrice";

const useShippingArea = () => {
  const [shippingArea, setShippingArea] = useRecoilState(shippingAreaState);
  const resetShippingArea = useResetRecoilState(shippingAreaState);

  const changeShippingArea = () => {
    setShippingArea((prev) => (prev === "standard" ? "remote" : "standard"));
  };

  return {
    shippingArea,
    changeShippingArea,
    resetShippingArea,
  };
};

export default useShippingArea;
