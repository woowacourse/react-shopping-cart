import ProductDetail from 'components/Product/ProductDetail/ProductDetail';

export default {
  title: 'components/ProductDetail',
  component: ProductDetail,
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => <ProductDetail {...args} />;

export const Example = Template.bind({});

Example.args = {
  imgUrl:
    'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1608536490_103005_1.jpg?gif=1&w=1280&h=1280&c=c',
  name: '캐스터네츠 커스텀캣타워H_가드형',
  price: 6619000,
};
