import useBooleanState from "../common/useBooleanState";

const useDeliveryInformation = () => {
  const [isRemoteArea, , , toggleRemoteArea] = useBooleanState(false);

  return { isRemoteArea, toggleRemoteArea };
};

export default useDeliveryInformation;
