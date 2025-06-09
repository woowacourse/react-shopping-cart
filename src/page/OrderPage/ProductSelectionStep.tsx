import {
  CartContentRoot,
  CartContentLoading,
  CartContentHeader,
  CartContentItems,
} from "@/components/Cart/CartContent/CartContent";

export default function ProductSelectionStep() {
  return (
    <CartContentRoot>
      <CartContentLoading />
      <CartContentHeader />
      <CartContentItems />
    </CartContentRoot>
  );
}
