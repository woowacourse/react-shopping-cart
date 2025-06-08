import { createContext, useContext, useState } from "react";

interface ShippingContextType {
  isRemoteAreaShipping: boolean;
  setIsRemoteAreaShipping: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShippingProviderProps {
  children: React.ReactNode;
}

const ShippingContext = createContext<ShippingContextType | null>(null);

export const useShippingContext = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error(
      "useShippingContext must be used within a ShippingProvider"
    );
  }
  return context;
};

export const ShippingProvider = ({ children }: ShippingProviderProps) => {
  const [isRemoteAreaShipping, setIsRemoteAreaShipping] =
    useState<boolean>(false);

  return (
    <ShippingContext.Provider
      value={{
        isRemoteAreaShipping,
        setIsRemoteAreaShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};
