import ShoppingCartProducts from ".";

export default {
  title: "presentational",
  component: ShoppingCartProducts,
};

const Template = (args) => <ShoppingCartProducts {...args} />;
export const ShoppingCartProductsTemplate = Template.bind({});
ShoppingCartProductsTemplate.args = {
  products: [
    {
      id: 1,
      productQuantity: 1,
      imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
      title: "망고",
      price: 4000,
      handleIncrement: () => {},
      handleDecrement: () => {},
    },
    {
      id: 2,
      productQuantity: 1,
      imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
      title: "수박",
      price: 40000,
      handleIncrement: () => {},
      handleDecrement: () => {},
    },
    {
      id: 3,
      productQuantity: 7,
      imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
      title: "딸기",
      price: 700,
      handleIncrement: () => {},
      handleDecrement: () => {},
    },
  ],
};
