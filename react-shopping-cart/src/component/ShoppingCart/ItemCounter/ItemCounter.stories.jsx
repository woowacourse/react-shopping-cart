import ItemCounter from "component/ShoppingCart/ItemCounter/ItemCounter";

export default {
  title: "ItemCounter",
  component: ItemCounter,
};

export const DefaultItemCounter = (args) => <ItemCounter {...args} />;
DefaultItemCounter.args = {};
