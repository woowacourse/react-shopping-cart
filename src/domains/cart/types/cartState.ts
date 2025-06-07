import { CartItemWithSelection } from "./response";

export interface State {
  items: CartItemWithSelection[];
  allSelected: boolean;
}
