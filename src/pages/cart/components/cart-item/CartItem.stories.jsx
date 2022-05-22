import CartItem from "./CartItem";

export default {
  title: "Cart/CartItem",
  component: CartItem,
  argTypes: {},
};

function Template(args) {
  return (
    <div style={{ maxWidth: "600px" }}>
      <CartItem {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  checked: false,
  src: "https://place-hold.it/150x150",
  alt: "This is image alt",
  productId: "product-id",
  productName: "Product Name",
  quantity: 10,
  price: "$30.2",
  onChecked: () => undefined,
  onQuantityChange: () => undefined,
};
