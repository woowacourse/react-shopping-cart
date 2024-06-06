import { CartItem } from "../../types";
import { SelectCouponButton } from "../button";
import { OrderSummary } from "../cartSummary";
import { SelectedCartItemCardList } from "../selectedCartItemCardList/selectedCartItemCardList";
import { ShippingRegionInfo } from "../shippingRegionInfo/ShippingRegionInfo";
import { StyledOrderContentSection } from "./OrderContentSection.styled";

export const OrderContentSection: React.FC<{ selectedCartItems: CartItem[] }> = ({
  selectedCartItems,
}) => {
  return (
    <StyledOrderContentSection>
      <SelectedCartItemCardList selectedCartItems={selectedCartItems} />
      <SelectCouponButton />
      <ShippingRegionInfo />
      <OrderSummary />
    </StyledOrderContentSection>
  );
};
