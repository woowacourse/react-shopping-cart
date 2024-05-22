import { SelectCouponButton } from "../button/selectCouponButton/SelectCouponButton";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import { OrderSummary } from "../cartSummary";
import { ShippingRegionInfo } from "../shippingRegionInfo/ShippingRegionInfo";
import { StyledOrderContentSection } from "./OrderContentSection.styled";

export const OrderContentSection: React.FC = () => {
  const data = {
    id: 742,
    quantity: 1,
    product: {
      id: 2,
      name: "나이키",
      price: 1000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
  };
  const data2 = {
    id: 430,
    quantity: 1,
    product: {
      id: 21,
      name: "나이키",
      price: 20000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
  };

  const onClick = () => {};

  return (
    <StyledOrderContentSection>
      <CartItemCard key={data.id} {...data} isChecked={true} onCheck={() => {}} />
      <CartItemCard key={data2.id} {...data2} isChecked={true} onCheck={() => {}} />
      <SelectCouponButton onClick={onClick}></SelectCouponButton>
      <ShippingRegionInfo />
      <OrderSummary />
    </StyledOrderContentSection>
  );
};
