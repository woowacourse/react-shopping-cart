import { remoteAreaState } from "@/recoil/shippingFee";
import { useRecoilState } from "recoil";

const useRemoteArea = () => {
  const [isRemoteArea, setIsRemoteArea] = useRecoilState(remoteAreaState);

  const toggleRemoteArea = () => setIsRemoteArea((prev) => !prev);

  return {
    isRemoteArea,
    toggleRemoteArea,
  };
};

export default useRemoteArea;
