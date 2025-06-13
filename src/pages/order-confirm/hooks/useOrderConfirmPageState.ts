import { ROUTES } from "@/shared/config/routes";
import { isValidOrderConfirmState } from "../validation/isValidOrderConfirmState";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";

export const useOrderConfirmPageState = () => {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isValidOrderConfirmState,
    redirectPath: ROUTES.CART,
  });

  return {
    orderList: state?.orderList ?? [],
    isLoading: isValidating,
  };
};
