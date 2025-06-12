import { useState } from 'react';
import { ShippingContext } from './ShippingContext';

type ShippingProviderProps = {
  children: React.ReactNode;
};

export const ShippingProvider = ({ children }: ShippingProviderProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  return (
    <ShippingContext.Provider value={{ isRemoteArea, setIsRemoteArea }}>
      {children}
    </ShippingContext.Provider>
  );
};
