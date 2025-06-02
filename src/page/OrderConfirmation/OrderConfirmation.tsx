import { CartItem } from "@/type/CartItem";
import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";

interface OrderConfirmationProps {
  onPrev: () => void;
  cartItemsData: CartItem[];
}

function OrderConfirmation({ cartItemsData, onPrev }: OrderConfirmationProps) {
  return (
    <>
      <OrderConfirmationHeader handleGoBackToHomeButton={onPrev} />
      <OrderConfirmationList>
        {cartItemsData.map((cartItem) => {
          return (
            <OrderConfirmationPreviewCard
              key={cartItem.id}
              cartItem={cartItem}
            />
          );
        })}
      </OrderConfirmationList>
    </>
  );
}

export default OrderConfirmation;
