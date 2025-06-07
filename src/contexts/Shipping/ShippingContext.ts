import { createContext, Dispatch, useContext } from 'react';

type ShippingInfo = {
  isRemoteArea: boolean;
  setIsRemoteArea: Dispatch<boolean>;
};
export const ShippingContext = createContext<ShippingInfo | null>(null);

export const useShippingContext = () => {
  const context = useContext(ShippingContext);

  if (!context) throw new Error('ShippingProvider로 감싸야 합니다.');

  return context;
};
