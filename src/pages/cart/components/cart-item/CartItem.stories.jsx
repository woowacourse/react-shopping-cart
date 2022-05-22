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

const item = {
  selected_in_cart: false,
  id: "mUtrhmnU",
  title: "Product Title",
  quantity: 10,
  price: "$120.00",
  thumbnail_image: {
    url: "https://place-hold.it/150x150",
    alt: "Product Image Alt",
  },
};

Primary.args = {
  onChecked: () => undefined,
  onQuantityChange: () => undefined,
  ...item,
};
