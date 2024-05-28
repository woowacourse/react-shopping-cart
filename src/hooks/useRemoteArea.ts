import { remoteAreaState } from "@/recoil/shippingFee";
import useToggleRecoilState from "./useToggleRecoilState";

const useRemoteArea = () => {
  const { isActive: isRemoteArea, toggleActiveState: toggleRemoteArea } =
    useToggleRecoilState(remoteAreaState);

  return {
    isRemoteArea,
    toggleRemoteArea,
  };
};

export default useRemoteArea;
