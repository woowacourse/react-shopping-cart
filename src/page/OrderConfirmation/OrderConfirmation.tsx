import { CartItem } from "@/type/CartItem";
import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";
import * as Styled from "./OrderConfirmation.style";

interface OrderConfirmationProps {
  onPrev: () => void;
  selectedCartItems: CartItem[];
}

function OrderConfirmation({
  selectedCartItems,
  onPrev,
}: OrderConfirmationProps) {
  return (
    <>
      <OrderConfirmationHeader handleGoBackToHomeButton={onPrev} />
      <Styled.Container>
        <OrderConfirmationList>
          {selectedCartItems.map((cartItem) => {
            return (
              <OrderConfirmationPreviewCard
                key={cartItem.id}
                cartItem={cartItem}
              />
            );
          })}
        </OrderConfirmationList>
      </Styled.Container>
    </>
  );
}

export default OrderConfirmation;
