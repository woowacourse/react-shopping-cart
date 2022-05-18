import ProductItem from '.';

export default {
  title: 'Component/ProductItem',
  component: ProductItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <ProductItem {...args} />;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  id: 1,
  image: 'https://cdn-mart.baemin.com/sellergoods/list/a7dc3e2b-fe03-4479-ae91-2a681244bc54.jpg',
  name: '펩시보다는 코카콜라',
  price: 1000,
};
