import Item from ".";

export default {
  title: "Presentational",
  component: Item,
};

const Template = (args) => <Item {...args} />;

export const ItemTemplate = Template.bind({});
ItemTemplate.args = {
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "드록바",
  price: 3000000,
  onClick: () => {},
  go: () => {},
  isInShoppingCart: true,
};
