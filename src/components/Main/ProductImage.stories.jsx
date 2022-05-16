import ProductImage from 'components/Main/ProductImage';

export default {
  title: 'ProductImage',
  component: ProductImage,
};

function Template(args) {
  return <ProductImage {...args} />;
}

export const MediumProductImage = Template.bind({});

MediumProductImage.args = {
  src: 'http://kormedi.com/wp-content/uploads/2021/05/0002313329_001_202105200942055171-580x387.jpg',
};

export const LargeProductImage = Template.bind({});

LargeProductImage.args = {
  src: 'http://kormedi.com/wp-content/uploads/2021/05/0002313329_001_202105200942055171-580x387.jpg',
  size: 'large',
};
