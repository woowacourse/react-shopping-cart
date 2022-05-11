import ItemDetails from ".";

export default {
  title: "Item Details",
  component: ItemDetails,
};

const Template = (args) => <ItemDetails {...args} />;
export const ItemDetailsTemplate = Template.bind({});
ItemDetailsTemplate.args = {
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "록바1",
  price: 30000,
  isInShoppingCart: true,
};
