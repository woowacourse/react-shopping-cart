import ProductCard from '.';

export default {
  component: ProductCard,
  title: 'components/ProductList/ProductCard',
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  imgSrc: 'https://picsum.photos/200/200',
  name: 'PET보틀-정사각(420ml)',
  price: '43400',
};
