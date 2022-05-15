import ItemCounter from 'component/ItemCounter';

export default {
  title: 'ItemCounter',
  component: ItemCounter,
};

export const DefaultItemCounter = (args) => <ItemCounter {...args} />;
DefaultItemCounter.args = {};
