import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import { isValidPaymentSuccessState } from "../validation/isValidPaymentSuccessState";
import { ROUTES } from "@/shared/config/routes";

export const usePaymentSuccessPageState = () => {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isValidPaymentSuccessState,
    redirectPath: ROUTES.CART,
  });

  return {
    orderList: state?.orderList ?? [],
    paymentPrice: state?.paymentPrice ?? 0,
    isLoading: isValidating,
  };
};
