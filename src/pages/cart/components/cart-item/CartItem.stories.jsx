import productsFromJSON from "@mock/products.json";
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

const product = {
  ...productsFromJSON[0],
  thumbnail_image: {
    url: "https://place-hold.it/150x150",
    alt: "Product Image Alt",
  },
};

Primary.args = {
  onChecked: () => undefined,
  onQuantityChange: () => undefined,
  ...product,
  id: product.sku,
};
