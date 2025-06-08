import useBooleanState from "../../../hooks/common/useBooleanState";

const useDeliveryInformation = () => {
  const [isRemoteArea, , , toggleRemoteArea] = useBooleanState(false);

  return { isRemoteArea, toggleRemoteArea };
};

export default useDeliveryInformation;
