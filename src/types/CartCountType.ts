export interface CartCountProps {
  quantity: number;
  handleDeleteCart?: () => void;
  increaseProductCount: () => void;
  decreaseProductCount: () => void;
}
