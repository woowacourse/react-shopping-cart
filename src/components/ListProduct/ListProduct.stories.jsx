import ListProduct from './ListProduct';

export default {
  title: 'Components/ListProduct',
  component: ListProduct,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <ListProduct {...args} />;

const DefaultListProduct = Template.bind({});

DefaultListProduct.args = {
  id: 1,
  image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
  name: '사과',
  price: 1300,
};

export { DefaultListProduct };
