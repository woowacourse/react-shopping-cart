import ProductCard from 'components/ProductCard/ProductCard';

export default {
  title: 'ProductCard',
  component: ProductCard,
};

const Template = (args) => <ProductCard {...args} />;

export const DefaultProductCard = Template.bind({});
DefaultProductCard.args = {
  thumbnail:
    'https://cdn-mart.baemin.com/goods/custom/20200525/11157-main-01.png',
  name: 'PET보틀-정사각(420ml)',
  price: '43,400원',
};
