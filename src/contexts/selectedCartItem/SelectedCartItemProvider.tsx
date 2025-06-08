import { createContext } from "react";
import { useSelected } from "../../hooks/useSelected";

interface SelectedCartItemContext {
  selectedItemIds: Set<number>;
  toggleSelectedItemId: (id: number) => void;
  replaceSelectedItemIds: (ids: number[]) => void;
}

interface SelectedCartItemProviderProps {
  children: React.ReactNode;
}

export const SelectedCartItemContext =
  createContext<SelectedCartItemContext | null>(null);

export const SelectedCartItemProvider = ({
  children,
}: SelectedCartItemProviderProps) => {
  const { selectedItemIds, toggleSelectedItemId, replaceSelectedItemIds } =
    useSelected({ enableStorage: true, storageKey: "selectedCartItemIds" });

  return (
    <SelectedCartItemContext.Provider
      value={{
        selectedItemIds,
        toggleSelectedItemId,
        replaceSelectedItemIds,
      }}
    >
      {children}
    </SelectedCartItemContext.Provider>
  );
};
