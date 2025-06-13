import { createContext, useContext, useState, ReactNode } from 'react';

interface ShippingContextType {
  isExtraShippingFee: boolean;
  toggleExtraShippingFee: () => void;
}

const ShippingContext = createContext<ShippingContextType | null>(null);

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [isExtraShippingFee, setIsExtraShippingFee] = useState(false);

  const toggleExtraShippingFee = () => setIsExtraShippingFee((prev) => !prev);

  return (
    <ShippingContext.Provider
      value={{
        isExtraShippingFee,
        toggleExtraShippingFee,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error('useShipping must be used within a ShippingProvider');
  }
  return context;
}
