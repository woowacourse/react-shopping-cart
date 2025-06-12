import { createContext, useContext, useState, ReactNode } from 'react';
import { BASE_SHIPPING_FEE, EXTRA_SHIPPING_FEE } from '../constants/payments';

interface ShippingContextType {
  isExtraShippingFee: boolean;
  toggleExtraShippingFee: () => void;
  calculateShippingFee: (price: number, hasFreeShippingCoupon: boolean) => number;
}

const ShippingContext = createContext<ShippingContextType | null>(null);

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [isExtraShippingFee, setIsExtraShippingFee] = useState(false);

  const toggleExtraShippingFee = () => setIsExtraShippingFee((prev) => !prev);

  const calculateShippingFee = (price: number, hasFreeShippingCoupon: boolean) => {
    if (price >= 100000) {
      return 0;
    }

    if (hasFreeShippingCoupon) {
      return isExtraShippingFee ? EXTRA_SHIPPING_FEE : BASE_SHIPPING_FEE;
    }

    return isExtraShippingFee ? EXTRA_SHIPPING_FEE : BASE_SHIPPING_FEE;
  };

  return (
    <ShippingContext.Provider
      value={{
        isExtraShippingFee,
        toggleExtraShippingFee,
        calculateShippingFee,
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
