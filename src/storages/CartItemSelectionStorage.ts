import { LocalStorage } from "./LocalStorage";

interface CartItemSelection {
  cartId: number;
  checked: boolean;
}

class CartItemSelectionStorage {
  private static readonly CART_ITEM_SELECTION_KEY = "cartItemSelection";
  private storage: LocalStorage = new LocalStorage();

  getSelections(): CartItemSelection[] {
    return (
      this.storage.get<CartItemSelection[]>(
        CartItemSelectionStorage.CART_ITEM_SELECTION_KEY
      ) ?? []
    );
  }

  setSelection(cartId: number, checked: boolean) {
    const selections = this.getSelections();
    const existingIndex = selections.findIndex(
      (item) => item.cartId === cartId
    );

    if (existingIndex >= 0) {
      selections[existingIndex].checked = checked;
    } else {
      selections.push({ cartId, checked });
    }

    this.storage.set<CartItemSelection[]>(
      CartItemSelectionStorage.CART_ITEM_SELECTION_KEY,
      selections
    );
  }

  setAllSelections(cartIds: number[], checked: boolean) {
    const selections = this.getSelections();
    const updatedSelections = [...selections];

    cartIds.forEach((cartId) => {
      const existingIndex = updatedSelections.findIndex(
        (item) => item.cartId === cartId
      );
      if (existingIndex >= 0) {
        updatedSelections[existingIndex].checked = checked;
      } else {
        updatedSelections.push({ cartId, checked });
      }
    });

    this.storage.set<CartItemSelection[]>(
      CartItemSelectionStorage.CART_ITEM_SELECTION_KEY,
      updatedSelections
    );
  }

  removeSelection(cartId: number) {
    const selections = this.getSelections();
    const filteredSelections = selections.filter(
      (item) => item.cartId !== cartId
    );
    this.storage.set(
      CartItemSelectionStorage.CART_ITEM_SELECTION_KEY,
      filteredSelections
    );
  }

  clearAllSelections() {
    this.storage.remove(CartItemSelectionStorage.CART_ITEM_SELECTION_KEY);
  }

  isItemSelected(cartId: number): boolean {
    return (
      this.getSelections().find((item) => item.cartId === cartId)?.checked ??
      false
    );
  }
}

export const cartItemSelectionStorage = new CartItemSelectionStorage();
