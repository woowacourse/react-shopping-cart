import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {CartProduct} from '../type/cart';

type SelectedContextType = {
  selectedItem: CartProduct[];
  selectedCartId: number[];
  setSelectedCartId: Dispatch<SetStateAction<number[]>>;
  cartItems: CartProduct[] | undefined;
  setCartItems: Dispatch<SetStateAction<CartProduct[] | undefined>>;
};

export const CartItemsContext = createContext<SelectedContextType | undefined>(
  undefined
);

export const CartItemsProvider = ({children}: {children: ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>();
  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);

  const selectedItem =
    cartItems?.filter(
      (item: CartProduct) => selectedCartId.indexOf(item.id) > -1
    ) || [];

  return (
    <CartItemsContext.Provider
      value={{
        selectedItem,
        selectedCartId,
        setSelectedCartId,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export const useSelectedItems = () => {
  const context = useContext(CartItemsContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorContext.Provider');
  }

  return context.selectedItem;
};

export const useSelectedCartId = () => {
  const context = useContext(CartItemsContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorContext.Provider');
  }

  return {
    selectedCartId: context.selectedCartId,
    setSelectedCartId: context.setSelectedCartId,
  };
};

export const useCartItems = () => {
  const context = useContext(CartItemsContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorContext.Provider');
  }

  return {
    cartItems: context.cartItems,
    setCartItems: context.setCartItems,
  };
};
