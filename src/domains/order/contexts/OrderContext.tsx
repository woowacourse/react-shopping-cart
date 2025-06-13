import { createContext, useState, PropsWithChildren } from "react";

interface OrderContextType {
  isRemoteArea: boolean;
  toggleRemoteArea: () => void;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const toggleRemoteArea = () => setIsRemoteArea((prev) => !prev);

  return (
    <OrderContext.Provider value={{ isRemoteArea, toggleRemoteArea }}>
      {children}
    </OrderContext.Provider>
  );
};
