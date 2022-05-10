import Text from './Text.component';

export default {
  title: 'Text',
  component: Text,
};

export const ItemNameText = args => <Text {...args}>PET보틀-정사각(420ml)</Text>;
ItemNameText.args = {};

export const ItemPriceText = args => <Text {...args}>43,400원</Text>;
ItemPriceText.args = {
  fontSize: 20,
};
